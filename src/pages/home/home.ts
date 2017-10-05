import { Component } from '@angular/core';
import { CuesPage } from '../cues/cues';
import { NavController, ModalController, AlertController, ActionSheetController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { CueStackProvider } from '../../providers/cuestack/cuestack';
import moment from 'moment';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  cards: Array<{id: string, checked: boolean, title: string, imageUrl: string, description: string, status: string, timeStart: any}>;
  status: string;
  checked: boolean;
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
      this.user = this.auth.authUser();
      this.user.subscribe(data => {
        if (data) {
          let userid = data.uid;
          let stacks = this.cueStack.getStacks(userid);
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


  openModalAddStack() {
    this.openModal('AddStackPage');
    // let addStackModel = this.modalCtrl.create('AddStackPage', {id: String(this.count)}, { cssClass: 'inset-modal' });
    // addStackModel.onDidDismiss(data => {
    //   console.log(data);
    //   if (data) {
    //     //this.cards = [];
    //     console.log("clean cards");
    //   }
    // });
    // addStackModel.present();
  }

  openModalLogin() {
    this.openModal('LoginPage');
  }

  openModalSignup() {
    this.openModal('SignupPage');
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
    //console.log("id=" + String(card.id));
    this.navCtrl.push(CuesPage, {title: card.title, id: card.id, currentUser: this.auth.currentUser});    
  }


  updateStatus(cards, status: string) {
    //alert('updateStatus = ' + status);
    cards.forEach(card => {    
      if (card.checked) {
        this.cueStack.updateStackStatus(card.id, status);
      }
    });
    //clear
    this.clearCheck(false);        
  }

  deleteChecked(cards) {
    //alert('delete checked items');
    cards.forEach(card => { 
      if (card.checked) {  
        this.cueStack.deleteStack(card.id);
      }
    });
    //clear
    this.clearCheck(false);        
  }

  checkSelect() {
    //alert('checkSelect:: checked all off');
    if (this.checked) {this.checked = false;}
    else { this.checked = true;}
    //clear
    this.clearCheck(this.checked);        
  }

  clearCheck(checked: boolean) {
    this.checked = checked;        
    this.cards.forEach(card => { 
      card.checked = false;
    });    
  }


  doRadio(status: string, updated: boolean) {
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
        console.log('Radio data:', data);  
        if (updated) {  //update status on all checked items
          this.updateStatus(this.cards, data);
        }
        else {          //change filter
          this.status = data;          
        }
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
            this.doRadio(this.status, false);
          }
        },
        {
          text: 'update status',
          icon: 'text',
          handler: () => {
            this.doRadio(this.status, true);
          }
        },
        {
          text: 'delete',
          icon: 'trash',
          handler: () => {
            this.deleteChecked(this.cards);
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






  share(card) {
    alert(card.title + ' was shared.');
  }

  favorite(card) {
    alert(card.title + ' was favorited.');
    this.cueStack.updateStackStatus(card.id, "favorite")
  }


}
