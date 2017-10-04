import { Component } from '@angular/core';
import { ModalController, NavParams } from 'ionic-angular';
import { CueStackProvider } from '../../providers/cuestack/cuestack';

@Component({
  selector: 'page-list-cue',
  templateUrl: 'list-cue.html'
})
export class ListCuePage {
  cards: Array<{id: string, question: string, answer: string, imageUrl: string, rate: string}>;
  stackid: string;

  constructor(
    private modalCtrl: ModalController,
    public navParams: NavParams,
    private cueStack: CueStackProvider) {
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
            rate: cue.rate
          })
        });
      });
  }
  
  cardTapped(event, card) {    
    this.modalCtrl.create('EditCuePage', {
      id: card.id,
      question: card.question,
      answer: card.answer,
      imageUrl: card.imageUrl,
      rate: card.rate}, { cssClass: 'inset-modal' })
    .present();
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
