import { Component } from '@angular/core';
import { ModalController, NavParams } from 'ionic-angular';
import { CueStackProvider } from '../../providers/cuestack/cuestack';

@Component({
  selector: 'page-list-cue',
  templateUrl: 'list-cue.html'
})
export class ListCuePage {
  cards: Array<{id: string, idrate: string, question: string, answer: string, imageUrl: string, rate: string}>;
  stackid: string;
  userid: string;

  constructor(
    private modalCtrl: ModalController,
    public navParams: NavParams,
    private cueStack: CueStackProvider) {
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
            rate: ''
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
    let editCueModel = this.modalCtrl.create('EditCuePage', {
      id: card.id,
      idrate: card.idrate,
      question: card.question,
      answer: card.answer,
      imageUrl: card.imageUrl,
      rate: card.rate}, { cssClass: 'inset-modal' });
    editCueModel.onDidDismiss(data => {
      console.log(data);
      if (data) {
        console.log("modified cue");
        this.showRates();
      }
    });
    editCueModel.present();
  }

  share(card) {
    alert(card.question + ' was shared.');
  }

  edit(card) {
    alert(card.question + ' was editted.');
  }

  delete(card) {
    alert('Deleting ' + card.question);
    this.cueStack.deleteCue(card.id);
  }

}
