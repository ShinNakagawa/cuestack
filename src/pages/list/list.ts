import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, ActionSheetController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { CueStackProvider } from '../../providers/cuestack/cuestack';
import { ListCuePage } from '../list-cue/list-cue';
import moment from 'moment';
import { StackStatus } from '../../models/stackstatus.model';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  cards: Array<{id: string, 
                checked: boolean, 
                title: string, 
                imageUrl: string, 
                description: string, 
                status: string, 
                idstatus: string, 
                timeStart: any, 
                shareflag: boolean}>;
  checked: boolean;
  value: string;

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private cueStack: CueStackProvider,
    public alertCtrl: AlertController,
    public actionsheetCtrl: ActionSheetController,
    private auth: AuthProvider) {
      this.checked = false;
      this.value = '1';
      this.loadCards();
   }

  loadCards() {
    if (this.auth.currentUser) {       
      let stacks = this.cueStack.getStacks();
      stacks.subscribe(res => {
        this.cards = [];   
        res.forEach(stack => {
          if (stack.statusAry === null || stack.statusAry === undefined){
            console.log('skip to add stack[', stack.id, '] into cards because stack.statusAry is null or undefined.')
          } else {
            let userid = this.cueStack.currentUserId;
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
        });
      });
    }
  }

  cardTapped(event, card) {
    this.navCtrl.push(ListCuePage, {title: card.title, id: card.id});    
  }

  reportsPage(card) {
    this.modalCtrl.create('ReportsPage', {title: card.title, id: card.id}, { cssClass: 'inset-modal' })
    .present();
  }

  edit(card) {
    this.modalCtrl.create('EditStackPage', { card: card }, { cssClass: 'inset-modal' })
    .present();
  }

  openModalAddStack() {
    let addStackModel = this.modalCtrl.create('AddStackPage', null, { cssClass: 'inset-modal' });
    addStackModel.onDidDismiss(data => {
      if (data) {
        console.log("ListPage::openModalAddStack new stack was added");
        this.loadCards();
      }
    });
    addStackModel.present();
  }

  deleteChecked(cards) {
    cards.forEach(card => { 
      if (card.checked) {  
        this.cueStack.deleteStack(card.id);
      }
    });
    this.clearCheck(false);        
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

  setShare(sharedflag: boolean) {
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

  updateShare(cards, sharedflag: boolean) {
    cards.forEach(card => {    
      if (card.checked) {
        this.cueStack.updateStackShare(card.id, sharedflag);
      }
    });
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
            this.setStatus('all');
          }
        },
        {
          text: 'share stacks',
          icon: 'text',
          handler: () => {
            this.setShare(false);
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
