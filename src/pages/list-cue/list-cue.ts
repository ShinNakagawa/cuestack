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
  keptCards: any;
  
  constructor(
    private modalCtrl: ModalController,
    public navParams: NavParams,
    public actionsheetCtrl: ActionSheetController,
    private cueStack: CueStackProvider,
    private auth: AuthProvider) {
      this.checked = false;
      this.value = '1';
      this.stackid = navParams.get('id');
      this.keptCards = null;
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
    this.closeMode();
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
    this.closeMode();        
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
    this.cards = this.query(this.cards, {question: val, answer: val});
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
  }

  onCancel(event) {
    this.initializeSearch();
    this.keptCards = null;
  }
  // Search functions=======================================  
}
