import { Component } from '@angular/core';
import { CuesPage } from '../cues/cues';
import { NavController, ModalController, AlertController, ActionSheetController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { CueStackProvider } from '../../providers/cuestack/cuestack';
import moment from 'moment';
import { StackStatus } from '../../models/stackstatus.model';
import { Stack } from '../../models/stack.model';

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
                shareflag: boolean}>;
  status: string;
  checked: boolean;
  value: string;
  currentUserId: string;
  
  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private cueStack: CueStackProvider,
    public alertCtrl: AlertController,
    public actionsheetCtrl: ActionSheetController,
    private toastCtrl: ToastController,
    private auth: AuthProvider) {      
      this.status = 'all';
      this.checked = false;
      this.value = '1';
      this.currentUserId = '';
      if (this.auth.currentUser) {       
        console.log('this.auth.currentUser=', this.auth.currentUser);
        this.currentUserId = this.cueStack.currentUserId;
        console.log('userid=', this.cueStack.currentUserId);    
      } else {
        let toast = this.toastCtrl.create({
          message: 'Unable to login, please wait for a while.',
          duration: 3000,
          position: 'top'
        });
        toast.present();
        this.openModalLogin();
      }
      this.loadCards();
  }

//   https://www.w3schools.com/css/img_lights.jpg
//   http://i.dailymail.co.uk/i/pix/2017/01/16/20/332EE38400000578-4125738-image-a-132_1484600112489.jpg   
//   https://cdn.eso.org/images/thumb700x/eso1238a.jpg

loadCards() {
  let userid = this.currentUserId;
  this.cueStack.getAllStacks1().subscribe(data => {
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
        } else if (stack.id === undefined) {
          console.log('stack.id is undefined');
        } else if (stack.id === 'temp-key') {
          console.log('stack.id is temp-key');
        } else {
          if (stack.statusAry === null || stack.statusAry === undefined){
            console.log('skip to add stack[', stack.id, '] into cards because stack.statusAry is null or undefined.')
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

loadCards1() {
    this.cards = []; 
  let data = this.cueStack.getAllStacks();
    data.subscribe(result => {
      console.log('result=', result);
      console.log('result.length=', result.length);
      let stacks: Stack[];
      stacks = [];
      Object.keys(result).map(function(arrayIndex){
        let array = result[arrayIndex];
        console.log('array in loop=', array);

        Object.keys(array).map(function(stackIndex){
          let stack = new Stack;
          stack = array[stackIndex];
          console.log('stack in loop=', stack);
          console.log('stack.id=', stack.id);

          Object.keys(stack.statusAry).map(function(statusIndex){
            let stackStatus = new StackStatus;
            stackStatus = stack.statusAry[statusIndex];
            console.log('stackStatus in loop=', stackStatus);
            console.log('stackStatus.status=', stackStatus.status);
          })
          stacks.push(stack);
        })
      });
      stacks.forEach(stack => {
        this.cards.push({
          id: stack.id,
          checked: false,
          title: stack.title,
          description: stack.description,
          imageUrl: stack.imageUrl,
          idstatus: '',
          status: status,
          shareflag: stack.shareflag,
          timeStart: moment(stack.timeStart, 'YYYY-MM-DD').calendar()
        })
      })       
    })

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
        this.loadCards();
      }
    });
    loginModel.present();
  }

  openModalSignup() {
    let signupModel = this.modalCtrl.create('SignupPage', null, { cssClass: 'inset-modal' });
    signupModel.onDidDismiss(data => {
      if (data) {
        console.log("HomePage::openModalSignup signup");
        this.loadCards();
      }
    });
    signupModel.present();
  }

  logout(): void {
    this.auth.logout();
    this.cueStack.logout();
    this.loadCards();
  }

  cardTapped(event, card) {
    let ids = [];
    ids.push({id: card.id, title: card.title});
    this.navCtrl.push(CuesPage, {id: ids});    
  }

  startStudy() {
    let ids = [];
    this.cards.forEach(card => {    
      if (card.checked) {
        ids.push({id: card.id, title: card.title})
      }
    });
    this.clearCheck(false);   
    this.navCtrl.push(CuesPage, {id: ids});    
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

  updateStatus(cards, status: string) {
    cards.forEach(card => {    
      if (card.checked) {
        card.idstatus = this.cueStack.updateStackStatus(card.id, status, card.idstatus);
      }
    });
    this.clearCheck(false);        
  }

  setStatus(status: string) {
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
        this.updateStatus(this.cards, data);
        this.clearCheck(false);           
      }
    });
    alert.present();
  }

  actionSheet1() {
    const actionsheet = this.actionsheetCtrl.create({
      title: 'select action',
      buttons: [
        {
          text: 'select filter',
          icon: 'text',
          handler: () => {
            this.selectStatus(this.status);
          }
        },
        {
          text: 'update status',
          icon: 'text',
          handler: () => {
            if (this.currentUserId !== '') {
              this.setStatus('all');                
            } else {
              alert('Please log in to update status.');                
            }
          }
        },
        {
          text: 'start study',
          icon: 'text',
          handler: () => {
            this.startStudy();
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

  // Search functions=======================================
  getItems(event) {
    let val = event.target.value;
    if (!val || !val.trim()) {
      this.loadCards();
      return;
    }
    this.cards = this.query({title: val, description: val});
  }

  query(params?: any) {
    if (!params) {
      return this.cards;
    }
    return this.cards.filter(item => {
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
  // Search functions=======================================
}
