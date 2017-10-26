import { Component } from '@angular/core';
import { ModalController, ActionSheetController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { CueStackProvider } from '../../providers/cuestack/cuestack';
import { CueRate } from '../../models/cuerate.model';

@Component({
  selector: 'page-list-cue',
  templateUrl: 'list-cue.html'
})
export class ListCuePage {
  cards: Array<{id: string, 
                idrate: string, 
                question: string, 
                answer: string, 
                imageUrl: string, 
                rate: string, 
                timeStart: string, 
                checked: boolean}>;
  stackid: string;
  checked: boolean;
  value: string;

  constructor(
    private modalCtrl: ModalController,
    public navParams: NavParams,
    public actionsheetCtrl: ActionSheetController,
    private cueStack: CueStackProvider,
    private auth: AuthProvider) {
      this.checked = false;
      this.value = '1';
      this.stackid = navParams.get('id');
      this.loadCards();
  }

  loadCards() {
    if (this.auth.currentUser) {        
      let userid = this.cueStack.currentUserId;
      this.cueStack.getCues(this.stackid).subscribe(res => {
        this.cards = [];    
        res.forEach(cue => {
          if (cue.rateAry === null || cue.rateAry === undefined){
            console.log('skip to update cue::rate[', cue.id, '] into cards because cue.rateAry is null or undefined.')
          } else {
            // get rate data
            let rate = '';
            let idrate = '';
            let timeStart = '';
            Object.keys(cue.rateAry).map(function(rateIndex){
              let cueRate = new CueRate;
              cueRate = cue.rateAry[rateIndex];
              if (cueRate.userid === userid){
                rate = cueRate.rate;
                idrate = rateIndex;
                timeStart = cueRate.timeStart;
              }
            })
            // store cue data
            this.cards.push({
              question: cue.question,
              answer: cue.answer,
              imageUrl: cue.imageUrl,
              id: cue.id,
              idrate: idrate,
              rate: rate,
              timeStart: timeStart,
              checked: false
            })
          }
        })
      })
    }
  }

  cardTapped(event, card) {    
    let editCueModel = this.modalCtrl.create('EditCuePage', { card : card }, { cssClass: 'inset-modal' });
    editCueModel.onDidDismiss(data => {
      if (data) {
        console.log("ListCuePage::cardTapped::modified cue");
        this.loadCards();
      }
    });
    editCueModel.present();
  }

  openModalAddCue() {
    let addCueModel = this.modalCtrl.create('AddCuePage', {id: this.stackid}, { cssClass: 'inset-modal' });
    addCueModel.onDidDismiss(data => {
      if (data) {
        console.log("ListCuePage::openModelAddCue() added cue");
        this.loadCards();
      }
    });
    addCueModel.present();
  }

  deleteChecked(cards) {
    cards.forEach(card => { 
      if (card.checked) {  
        this.cueStack.deleteCue(card.id);
      }
    });
    //clear check
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

  actionSheet1() {
    const actionsheet = this.actionsheetCtrl.create({
      title: 'select action',
      buttons: [
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
