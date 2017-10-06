import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, ActionSheetController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { CueStackProvider } from '../../providers/cuestack/cuestack';
import { ListCuePage } from '../list-cue/list-cue';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  cards: Array<{title: string, imageUrl: string, description: string, id: string, status: string, shareflag: boolean, checked: boolean}>;
  userid : string;
  checked: boolean;

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private cueStack: CueStackProvider,
    public alertCtrl: AlertController,
    public actionsheetCtrl: ActionSheetController,
    private auth: AuthProvider) {
      this.checked = false;
      let user = this.auth.authUser();
      user.subscribe(data => {
        if (data) {
          this.userid = data.uid;
          let stacks = this.cueStack.getStacks(this.userid);
          stacks.subscribe(res => {
            this.cards = [];   
            res.forEach(stack => {
              this.cards.push({
                title: stack.title,
                description: stack.description,
                imageUrl: stack.imageUrl,
                id: stack.id,
                status: stack.status,
                shareflag: stack.shareflag,
                checked: false
              })
            });
          });
        }
      });

   }

  cardTapped(event, card) {
    this.navCtrl.push(ListCuePage, {title: card.title, id: card.id, userid: this.userid});    
  }

  reportsPage(card) {
    this.modalCtrl.create('ReportsPage', {title: card.title, id: card.id, userid: this.userid}, { cssClass: 'inset-modal' })
    .present();
  }

  edit(card) {
    this.modalCtrl.create('EditStackPage', {
      id: card.id,
      title: card.title,
      description: card.description,
      imageUrl: card.imageUrl,
      status: card.status,
      shareflag: card.shareflag
    }, { cssClass: 'inset-modal' })
    .present();
  }

  updateStatus(cards, status: string) {
    cards.forEach(card => {    
      if (card.checked) {
        this.cueStack.updateStackStatus(card.id, status);
      }
    });
    //clear check
    this.clearCheck(false);        
  }

  deleteChecked(cards) {
    cards.forEach(card => { 
      if (card.checked) {  
        this.cueStack.deleteStack(card.id);
      }
    });
    //clear check
    this.clearCheck(false);        
  }

  checkSelect() {
    if (this.checked) {this.checked = false;}
    else { this.checked = true;}
    //clear check
    this.clearCheck(this.checked);        
  }

  clearCheck(checked: boolean) {
    this.checked = checked;        
    this.cards.forEach(card => { 
      card.checked = false;
    });    
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
        this.updateStatus(this.cards, data);
      }
    });
    alert.present();
  }

  selectShare(sharedflag: boolean) {
    const alert = this.alertCtrl.create();
    alert.setTitle('Set Share');
    alert.addInput({
      type: 'radio',
      label: 'Public',
      value: 'public',
      checked: (sharedflag == true) ? true : false
    });

    alert.addInput({
      type: 'radio',
      label: 'Private',
      value: 'private',
      checked: (sharedflag == false) ? true : false
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        console.log('share data:', data);
        let flag = false; 
        if (data === 'public') {
          flag = true;
        }
        this.updateShare(this.cards, flag);
      }
    });
    alert.present();
  }

  updateShare(cards, sharedflag: boolean) {
    cards.forEach(card => {    
      if (card.checked) {
        this.cueStack.updateStackShare(card.id, sharedflag);
      }
    });
    //clear check
    this.clearCheck(false);        
  }

  actionSheet1() {
    const actionsheet = this.actionsheetCtrl.create({
      title: 'select action',
      buttons: [
        {
          text: 'update status',
          icon: 'text',
          handler: () => {
            this.selectStatus('all');
          }
        },
        {
          text: 'share stacks',
          icon: 'text',
          handler: () => {
            this.selectShare(false);
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




}
