import { Component } from '@angular/core';
import { ModalController, ActionSheetController, NavParams } from 'ionic-angular';
import { CueStackProvider } from '../../providers/cuestack/cuestack';

@Component({
  selector: 'page-list-cue',
  templateUrl: 'list-cue.html'
})
export class ListCuePage {
  cards: Array<{id: string, idrate: string, question: string, answer: string, imageUrl: string, rate: string, checked: boolean}>;
  stackid: string;
  userid: string;
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
      this.userid = navParams.get('userid');
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
            checked: false
          })
        })
      })
  }

  showRates() {
    this.cards.forEach(card =>{
      //console.log("no=" + card.front.count + ', id=' + card.front.id);
      let cuerates = this.cueStack.getCueRates(card.id);
      cuerates.subscribe(resRate => {
        //console.log('resRate length=' + String(resRate.length));
        let cuerate = resRate.find(item => item.userid === this.userid);
        //console.log('cuerate.id=' + cuerate.id + ', rate=' + cuerate.rate);
        if (cuerate) {
          card.idrate = cuerate.id;
          card.rate = cuerate.rate;
        }
      })
    })
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
