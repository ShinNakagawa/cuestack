import { Component } from '@angular/core';
import { ModalController, ActionSheetController, NavParams } from 'ionic-angular';
import { CueStackProvider } from '../../providers/cuestack/cuestack';
import moment from 'moment';

@Component({
  selector: 'page-list-cue',
  templateUrl: 'list-cue.html'
})
export class ListCuePage {
  cards: Array<{id: string, idrate: string, question: string, answer: string, imageUrl: string, rate: string, timeStart: string, checked: boolean}>;
  stackid: string;
  checked: boolean;
  value: string;

  constructor(
    private modalCtrl: ModalController,
    public navParams: NavParams,
    public actionsheetCtrl: ActionSheetController,
    private cueStack: CueStackProvider) {
      this.checked = false;
      this.value = '1';
      this.stackid = navParams.get('id');
      let cues = this.cueStack.getCues(this.stackid);
      cues.subscribe(res => {
        this.cards = [];   
        res.forEach(cue => {
          this.cards.push({
            question: cue.question,
            answer: cue.answer,
            imageUrl: cue.imageUrl,
            id: cue.id,
            idrate: '',
            rate: '',
            timeStart: '',
            checked: false
          })
        })
      })
  }

  showRates() {
    let cuerates = [];
    let list = this.cueStack.getCueRatesByUserID();
    if (list) {
      list.subscribe(result => {cuerates.push(result)});
    }

    this.cards.forEach(card =>{
      console.log('cue id=' + card.id);
      let cuerate = cuerates.find(item => item.cueid === card.id);
      if (cuerate) {
        console.log('found cuerate.id=' + cuerate.id + ', rate=' + cuerate.rate);
        card.idrate = cuerate.id;
        card.rate = cuerate.rate;
        card.timeStart = this.setRateTime(cuerate.rate, cuerate.timeStart);
      }
    })
  }

  setRateTime(rate: string, timestamp: any) {
    let days = 0;
    if ( rate == 'good' ) {
      days = 100;
    } else if ( rate == 'bad' ) {
      days = 1;
    } else {
      days = 1000;
    }
    let timeStart = moment(timestamp, 'YYYY-MM-DD').add(days, 'days').calendar();  
    return timeStart;    
  }

  cardTapped(event, card) {    
    let editCueModel = this.modalCtrl.create('EditCuePage', { card : card }, { cssClass: 'inset-modal' });
    editCueModel.onDidDismiss(data => {
      //console.log(data);
      if (data) {
        console.log("modified cue");
        this.showRates();
      }
    });
    editCueModel.present();
  }

  deleteChecked(cards) {
    cards.forEach(card => { 
      if (card.checked) {  
        this.cueStack.deleteCue(card.id);
      }
    });
    //clear check
    this.clearCheck(false);        
    this.showRates();
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
