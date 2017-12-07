import { Component } from '@angular/core';
import { CuesPage } from '../cues/cues';
import { NavController, ModalController, AlertController, ActionSheetController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { CueStackProvider } from '../../providers/cuestack/cuestack';
import moment from 'moment';
import { StackStatus } from '../../models/stackstatus.model';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  cards: Array<{id: string,
                checked: boolean, 
                title: string, 
                imageUrl: string, 
                description: string, 
                status: string, 
                idstatus: string, 
                timeStart: any,
                editflag: string,
                userid: string,
                shareflag: boolean}>;
  status: string;
  checked: boolean;
  value: string;
  currentUserId: string;
  keptCards: any;

  ticks = 0;
  timer;
  sub: Subscription;
  
  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private cueStack: CueStackProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public actionsheetCtrl: ActionSheetController,
    private auth: AuthProvider) {      
      this.status = 'all';
      this.checked = false;
      this.value = '1';
      this.currentUserId = '';
      this.keptCards = null;
      if (this.auth.currentUser) {       
        console.log('this.auth.currentUser=', this.auth.currentUser);
        this.currentUserId = this.cueStack.currentUserId;
        console.log('userid=', this.cueStack.currentUserId);
        this.loadCards();    
      } else {
        console.log('Unable to read userID, so add timer to wait for user ID');       
        let toast = this.toastCtrl.create({
          message: 'Please wait for a second.',
          duration: 3000,
          position: 'top'
        });
        toast.present();
        this.startTimer();
      }
  }

  tickerFunc(tick){
    console.log("tickerFunc tick=", tick);
    this.ticks = tick;
    if (this.auth.currentUser) {
      this.stopTimer();
      // get userID
      console.log('this.auth.currentUser=', this.auth.currentUser);
      this.currentUserId = this.cueStack.currentUserId;
      console.log('userid=', this.cueStack.currentUserId);
      this.loadCards();
    } else if (tick === 3){
      this.stopTimer();
      // assuming no userID
      console.log('assuming no userID');
      this.loadCards();      
    }
  }
  // start timer
  startTimer() {
    console.log("start timer");
    //1 every second (1000ms), starting after 0.5(500ms) seconds
    this.timer = Observable.timer(500,1000);
    // subscribing to a observable returns a subscription object
    this.sub = this.timer.subscribe(t => this.tickerFunc(t));
  };
  // stops and resets the current timer
  stopTimer() {
    console.log("stop timer");
    // unsubscribe here
    this.sub.unsubscribe();
  }

//   https://www.w3schools.com/css/img_lights.jpg
//   http://i.dailymail.co.uk/i/pix/2017/01/16/20/332EE38400000578-4125738-image-a-132_1484600112489.jpg   
//   https://cdn.eso.org/images/thumb700x/eso1238a.jpg

loadCards() {
  let userid = this.currentUserId;
  this.cueStack.getAllStacks().subscribe(data => {
    this.cards = [];
    data.subscribe(res => {
      res.forEach(stack =>{
        let checkData = this.cards.filter(item => item.id === stack.id);
        if (checkData.length > 0) {
          console.log('exits duplicated stack id=', stack.id);
          if (stack.statusAry === null || stack.statusAry === undefined){
            console.log('skip to update stack:;status[', stack.id, '] into cards because stack.statusAry is null or undefined.')
          } else {
            Object.keys(stack.statusAry).map(function(statusIndex){
              let stackStatus = new StackStatus;
              stackStatus = stack.statusAry[statusIndex];
              if (stackStatus.userid === userid){
                checkData[0].status = stackStatus.status;
                checkData[0].idstatus = statusIndex;
              }
            })
          }
          //update other data
          checkData[0].title = stack.title;
          checkData[0].description = stack.description;
          checkData[0].imageUrl = stack.imageUrl;
          checkData[0].editflag = stack.editflag;
          checkData[0].shareflag = stack.shareflag;
        } else if (stack.id === undefined) {
          console.log('stack.id is undefined');
        } else if (stack.id === 'temp-key') {
          console.log('stack.id is temp-key');
        } else {
          if (stack.statusAry === null || stack.statusAry === undefined){
            console.log('skip to add stack[', stack.id, '] into cards because stack.statusAry is null or undefined.')
          } else if ( this.keptCards && this.value === '3' ) {
            console.log('skip to add stack because it is still in search mode')
          } else {
            let status = '';
            let idstatus = '';
            Object.keys(stack.statusAry).map(function(statusIndex){
              let stackStatus = new StackStatus;
              stackStatus = stack.statusAry[statusIndex];
              console.log('stackStatus in loop=', stackStatus);
              console.log('stackStatus.status=', stackStatus.status);
              if (stackStatus.userid === userid){
                status = stackStatus.status;
                idstatus = statusIndex;
              }
            })
            // add stack into cards
            this.cards.push({
              id: stack.id,
              checked: false,
              title: stack.title,
              description: stack.description,
              imageUrl: stack.imageUrl,
              status: status,
              idstatus: idstatus,
              editflag: stack.editflag,
              userid: stack.userid,
              shareflag: stack.shareflag,
              timeStart: moment(stack.timeStart, 'YYYY-MM-DD').calendar()
              //timeStart: moment(stack.timeStart, 'YYYY-MM-DD').add(5, 'days').calendar()
            })
          }
        }        
      })
    })
  }, getAllStacksError => {
      console.log(getAllStacksError);
  });
}

  openModalAddStack() {
    let addStackModel = this.modalCtrl.create('AddStackPage', null, { cssClass: 'inset-modal' });
    addStackModel.onDidDismiss(data => {
      if (data) {
        console.log("HomePage::openModalAddStack new stack was added");
        this.loadCards();
      }
    });
    addStackModel.present();
  }

  openModalLogin() {
    let loginModel = this.modalCtrl.create('LoginPage', null, { cssClass: 'inset-modal' });
    loginModel.onDidDismiss(data => {
      if (data) {
        console.log("HomePage::openModalLogin login");
        window.location.reload();
      }
    });
    loginModel.present();
  }

  openModalSignup() {
    let signupModel = this.modalCtrl.create('SignupPage', null, { cssClass: 'inset-modal' });
    signupModel.onDidDismiss(data => {
      if (data) {
        console.log("HomePage::openModalSignup signup");
        window.location.reload();        
      }
    });
    signupModel.present();
  }

  logout(): void {
    this.auth.logout();
    this.cueStack.logout();
    window.location.reload();    
  }

  cardTapped(event, card) {
    let stackData = [];
    stackData.push({id: card.id, title: card.title});
    let modeType = '';
    if ( this.currentUserId === card.userid || card.editflag === '1' ) {
      modeType = 'single';
    }
    this.navCtrl.push(CuesPage, {stackData: stackData, modeType: modeType});
    this.closeMode();
  }

  startStudyOnCheck() {
    let stackData = [];
    this.cards.forEach(card => {    
      if (card.checked) {
        stackData.push({id: card.id, title: card.title})
      }
    });
    this.clearCheck(false);   
    this.navCtrl.push(CuesPage, {stackData: stackData, modeType: 'study'});    
  }

  startCues(status: string) {
    let stackData = [];
    this.cards.forEach(card => {    
      if (card.status === status) {
        stackData.push({id: card.id, title: card.title})
      }
    });  
    this.navCtrl.push(CuesPage, {stackData: stackData, modeType: status});    
  }

  checkMode() {    
    this.clearCheck(false); 
    this.checked = true;          
    this.value = '2';      
  }

  searchMode() {
    this.value = '3';
  }

  closeMode() {
    this.clearCheck(false);
    this.keptCards = null;    
    this.loadCards();          
  }

  clearCheck(checked: boolean) {
    this.value = '1';    
    this.checked = checked; 
    if (this.cards) {      
      this.cards.forEach(card => { 
        card.checked = false;
      });
    }   
  }

  selectStatus(status: string) {
    const alert = this.alertCtrl.create();
    alert.setTitle('Set Status');

    alert.addInput({
      type: 'radio',
      label: 'Favorite',
      value: 'favorite',
      checked: (status == 'favorite') ? true : false
    });

    alert.addInput({
      type: 'radio',
      label: 'Study',
      value: 'study',
      checked: (status == 'study') ? true : false
    });

    alert.addInput({
      type: 'radio',
      label: 'All',
      value: 'all',
      checked: (status == 'all') ? true : false
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        console.log('status data:', data);  
        this.status = data;
        this.clearCheck(false);           
      }
    });
    alert.present();
  }

  setStatusOnCheck(status: string) {
    const alert = this.alertCtrl.create();
    alert.setTitle('Set Status');

    alert.addInput({
      type: 'radio',
      label: 'Favorite',
      value: 'favorite',
      checked: (status == 'favorite') ? true : false
    });

    alert.addInput({
      type: 'radio',
      label: 'Study',
      value: 'study',
      checked: (status == 'study') ? true : false
    });

    alert.addInput({
      type: 'radio',
      label: 'All',
      value: 'all',
      checked: (status == 'all') ? true : false
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        console.log('status data:', data);  
        this.cards.forEach(card => {    
          if (card.checked) {
            card.idstatus = this.cueStack.updateStackStatus(card.id, data, card.idstatus);
          }
        });    
        this.clearCheck(false);           
      }
    });
    alert.present();
  }

  actionSheet() {
    const actionsheet = this.actionsheetCtrl.create({
      title: 'select action',
      buttons: [
        {
          text: 'update status',
          icon: 'text',
          handler: () => {
            if (this.currentUserId == null || this.currentUserId == undefined || this.currentUserId == '') {
              alert('Please log in to update status.');                
            } else {
              this.setStatusOnCheck('all');                
            }
          }
        },
        {
          text: 'start study',
          icon: 'book',
          handler: () => {
            this.startStudyOnCheck();
          }
        },
        // {
        //   text: 'share stacks',
        //   icon: 'text',
        //   handler: () => {
        //     if (this.currentUserId == null || this.currentUserId == undefined || this.currentUserId == '') {
        //       alert('Please log in to share stack.');                
        //     } else {
        //       this.setShareOnCheck(false);
        //     }
        //   }
        // },
        {
          text: 'delete',
          icon: 'trash',
          handler: () => {
            this.deleteOnChecked(this.cards);
          }
        },
        {
          text: 'cancel',
          icon: 'close',
          role: 'destructive',
          handler: () => {
            console.log('the user has cancelled the interaction.');
          }
        }
      ]
    });
    return actionsheet.present();
  }
    
  setStatus(card) {
    const alert = this.alertCtrl.create();
    alert.setTitle('Set Status');

    alert.addInput({
      type: 'radio',
      label: 'Favorite',
      value: 'favorite',
      checked: (card.status == 'favorite') ? true : false
    });

    alert.addInput({
      type: 'radio',
      label: 'Study',
      value: 'study',
      checked: (card.status == 'study') ? true : false
    });

    alert.addInput({
      type: 'radio',
      label: 'All',
      value: 'all',
      checked: (card.status == 'all') ? true : false
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        console.log('status data:', data);
        card.idstatus = this.cueStack.updateStackStatus(card.id, data, card.idstatus);
      }
    });
    alert.present();
  }

  // Search functions=======================================
  initializeSearch() {
    if ( this.keptCards ) {
      this.cards = this.keptCards;
    } else {
      this.keptCards = this.cards;
    }
  }

  getItems(event) {
    this.initializeSearch();
    let val = event.target.value;
    if (!val || !val.trim()) {
      this.initializeSearch();
      return;
    }
    this.cards = this.query(this.cards, {title: val, description: val});
  }

  query(cards: any, params?: any) {
    if (!params) {
      return cards;
    }
    return cards.filter(item => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  onClear(event) {
    this.initializeSearch();
    this.keptCards = null;
    this.loadCards();
  }

  onCancel(event) {
    this.initializeSearch();
    this.keptCards = null;
    this.loadCards();
  }
  // Search functions=======================================

  edit(card) {
    let editModel = this.modalCtrl.create('EditStackPage', { card: card }, { cssClass: 'inset-modal' });
    editModel.onDidDismiss(data => {
      if (data) {
        console.log('HomePage::EditStackPage data=', data.idstatus);
        card.idstatus = data.idstatus;
      }
    });
    editModel.present();
  }

  report(card) {
    this.modalCtrl.create('ReportsPage', {title: card.title, id: card.id}, { cssClass: 'inset-modal' })
    .present();
  }

  // setShareOnCheck(sharedflag: boolean) {
  //   const alert = this.alertCtrl.create();
  //   alert.setTitle('Set Share');
  //   alert.addInput({
  //     type: 'radio',
  //     label: 'Public',
  //     value: 'public',
  //     checked: (sharedflag == true) ? true : false
  //   });

  //   alert.addInput({
  //     type: 'radio',
  //     label: 'Private',
  //     value: 'private',
  //     checked: (sharedflag == false) ? true : false
  //   });

  //   alert.addButton('Cancel');
  //   alert.addButton({
  //     text: 'Ok',
  //     handler: (data: any) => {
  //       console.log('share data:', data);
  //       let flag = false; 
  //       if (data === 'public') {
  //         flag = true;
  //       }
  //       this.updateShareOnCheck(this.cards, flag);
  //       this.clearCheck(false);           
  //     }
  //   });
  //   alert.present();
  // }

  // updateShareOnCheck(cards, sharedflag: boolean) {
  //   cards.forEach(card => {    
  //     if (card.checked) {
  //       if (card.userid === this.currentUserId) {
  //         this.cueStack.updateStackShare(card.id, sharedflag);
  //       } else {
  //         console.log(this.currentUserId, ' attempts to share the card owner[', card.userid, ']');
  //       }
  //     }
  //   });
  //   this.clearCheck(false);
  //   this.loadCards();     
  // }

  deleteOnChecked(cards) {
    cards.forEach(card => { 
      if (card.checked) {
        if (card.userid === this.currentUserId) {
          this.cueStack.deleteStack(card.id);
          this.cards.splice(this.cards.indexOf(card), 1);  
        } else {
          console.log(this.currentUserId, ' attempts to detele the card owner[', card.userid, ']');
          let toast = this.toastCtrl.create({
            message: 'This card can be deleted because this card is not yours.',
            duration: 3000,
            position: 'top'
          });
          toast.present();
        }
      }
    });
    this.clearCheck(false);
  }

  actionMenu() {
    const actionmenu = this.actionsheetCtrl.create({
      title: 'select menu',
      buttons: [
        {
          text: 'select',
          icon: 'list',
          handler: () => {
            this.checkMode();
          }
        },
        {
          text: 'select by filter',
          icon: 'text',
          handler: () => {
            this.selectStatus(this.status);
          }
        },
        {
          text: 'start study',
          icon: 'book',
          handler: () => {
            this.startCues('study');
          }
        },
        {
          text: 'start favorite',
          icon: 'star',
          handler: () => {
            this.startCues('favorite');
          }
        },
        {
          text: 'add new stack',
          icon: 'add',
          handler: () => {
            if (this.currentUserId == null || this.currentUserId == undefined || this.currentUserId == '') {
              alert('Please log in to add new stack.');                
            } else {
              this.openModalAddStack();
            }
          }
        },
        {
          text: 'cancel',
          icon: 'close',
          role: 'destructive',
          handler: () => {
            console.log('the user has cancelled the interaction.');
          }
        }
      ]
    });
    return actionmenu.present();
  }
  
}
