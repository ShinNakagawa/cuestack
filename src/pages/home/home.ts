import { Component } from '@angular/core';
import { CuesPage } from '../cues/cues';
import { NavController, ModalController, AlertController, ActionSheetController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { CueStackProvider } from '../../providers/cuestack/cuestack';
import moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  cards: Array<{id: string, checked: boolean, title: string, imageUrl: string, description: string, status: string, timeStart: any, shareflag: boolean}>;
  status: string;
  checked: boolean;
  value: string;
 
  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private cueStack: CueStackProvider,
    public alertCtrl: AlertController,
    public actionsheetCtrl: ActionSheetController,
    private auth: AuthProvider) {      
      this.status = 'all';
      this.checked = false;
      this.value = '1';
   }

//   https://www.w3schools.com/css/img_lights.jpg
//   http://i.dailymail.co.uk/i/pix/2017/01/16/20/332EE38400000578-4125738-image-a-132_1484600112489.jpg   
//   https://cdn.eso.org/images/thumb700x/eso1238a.jpg

  showStacks() {
    this.cards = [];   
    let all = this.cueStack.getAllStacks();
    all.subscribe(stacks => {
      stacks.subscribe(res => {
        console.log('res.length=', res.length);
        res.forEach(stack => {
          let checkData = this.cards.filter(item => item.id === stack.id);
          if (checkData.length > 0) {
            console.log('exits duplicated stack id=', stack.id);
          } else if (stack.id === undefined) {
            console.log('stack.id is undefined');
          } else if (stack.id === 'temp-key') {
            console.log('stack.id is temp-key');
          } else {
            this.cards.push({
              id: stack.id,
              checked: false,
              title: stack.title,
              description: stack.description,
              imageUrl: stack.imageUrl,
              status: stack.status,
              shareflag: stack.shareflag,
              timeStart: moment(stack.timeStart, 'YYYY-MM-DD').calendar()
              //timeStart: moment(stack.timeStart, 'YYYY-MM-DD').add(5, 'days').calendar()
            })
          }
        })
      })
    }, getAllStacksError => {
      console.log(getAllStacksError);
    });
  }

  openModalAddStack() {
    this.openModal('AddStackPage');
  }

  openModalLogin() {
    //this.openModal('LoginPage');
    let loginModel = this.modalCtrl.create('LoginPage', null, { cssClass: 'inset-modal' });
    loginModel.onDidDismiss(data => {
      if (data) {
        console.log("HomePage::uid=" + data.uid);
        this.showStacks();
      }
    });
    loginModel.present();
  }

  openModalSignup() {
    //this.openModal('SignupPage');
    let signupModel = this.modalCtrl.create('SignupPage', null, { cssClass: 'inset-modal' });
    signupModel.onDidDismiss(data => {
      if (data) {
        console.log("HomePage::uid=" + data.uid);
        this.showStacks();
      }
    });
    signupModel.present();
  }

  openModal(pageName) {
    this.modalCtrl.create(pageName, null, { cssClass: 'inset-modal' })
                  .present();
  }

  logout(): void {
    this.auth.logout();
    this.cueStack.logout();
    this.showStacks();
  }

  cardTapped(event, card) {
    let ids = [];
    ids.push({id: card.id, title: card.title});
    this.navCtrl.push(CuesPage, {id: ids, currentUser: this.auth.currentUser});    
  }

  startStudy() {
    let ids = [];
    this.cards.forEach(card => {    
      if (card.checked) {
        ids.push({id: card.id, title: card.title})
      }
    });
    //clear check
    this.clearCheck(false);   
    this.navCtrl.push(CuesPage, {id: ids, currentUser: this.auth.currentUser});    
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


}
