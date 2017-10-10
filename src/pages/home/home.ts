import { Component } from '@angular/core';
import { CuesPage } from '../cues/cues';
import { NavController, ModalController, AlertController, ActionSheetController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { CueStackProvider } from '../../providers/cuestack/cuestack';
import moment from 'moment';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  cards: Array<{id: string, checked: boolean, title: string, imageUrl: string, description: string, status: string, timeStart: any, shareflag: boolean}>;
  status: string;
  checked: boolean;
  value: string;
  userid: string;
  private user: Observable<firebase.User>;
  
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
      this.user = this.auth.authUser();
      this.user.subscribe(data => {
        if (data) {
          this.userid = data.uid;
          console.log('userid=' + this.userid);
          let stacks = this.cueStack.getStacks(this.userid);
          stacks.subscribe(res => {
            this.cards = [];   
            res.forEach(stack => {
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
            });
          });
        }
      });

   }

//   https://www.w3schools.com/css/img_lights.jpg
//   http://i.dailymail.co.uk/i/pix/2017/01/16/20/332EE38400000578-4125738-image-a-132_1484600112489.jpg   
//   https://cdn.eso.org/images/thumb700x/eso1238a.jpg

  showSharedStacks() {
    let sharedStacks = this.cueStack.getShareStacks(true);
    sharedStacks.subscribe(res => {
      //console.log('shared length=' + res.length);
      res.forEach(data =>{
        let stack = this.cards.find(item => item.id === data.id);
        if (!stack) {
          //console.log('found id=' + data.id);          
          this.cards.push({
            id: data.id,
            checked: false,
            title: data.title,
            description: data.description,
            imageUrl: data.imageUrl,
            status: data.status,
            shareflag: data.shareflag,
            timeStart: moment(data.timeStart, 'YYYY-MM-DD').calendar()
          })
        }
      })
    });

  }

  openModalAddStack() {
    this.openModal('AddStackPage');
  }

  openModalLogin() {
    this.openModal('LoginPage');
  }

  openModalSignup() {
    this.openModal('SignupPage');
  //   let signupModel = this.modalCtrl.create('SignupPage', null, { cssClass: 'inset-modal' });
  //   signupModel.onDidDismiss(data => {
  //     if (data) {
  //       console.log("HomePage::uid=" + data.uid);
  //       //this.userid = data.uid;
  //     }
  //   });
  //   signupModel.present();
  }

  openModal(pageName) {
    this.modalCtrl.create(pageName, null, { cssClass: 'inset-modal' })
                  .present();
  }

  logout(): void {
    this.cards = [];
    this.auth.logout();
  }

  cardTapped(event, card) {
    let ids = [];
    ids.push({id: card.id, title: card.title});
    this.navCtrl.push(CuesPage, {id: ids, userid: this.userid, currentUser: this.auth.currentUser});    
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
    this.navCtrl.push(CuesPage, {id: ids, userid: this.userid, currentUser: this.auth.currentUser});    
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
