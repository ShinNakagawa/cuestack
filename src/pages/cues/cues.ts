import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Cue } from '../../models/cue.model';
import { CueStackProvider } from '../../providers/cuestack/cuestack';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-cues',
  templateUrl: 'cues.html',
})
export class CuesPage {
  stackid: string;
  title: string;
  currentUser: string;
  cue: Cue;
  cards: Array<{front: { 
                  id: string,
                  length: string,
                  count: string,
                  rate: string,
                  timeStart: any,
                  imageUrl: string,
                  title: string, 
                  subtitle: string }, 
                back: {
                  imageUrl: string,
                  title: string,
                  subtitle: string,
                  content: string }}>;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    private cueStack: CueStackProvider) {
      this.stackid = navParams.get('id');
      this.title = navParams.get('title');
      this.currentUser = navParams.get('currentUser');
      let cues = this.cueStack.getCues(this.stackid);
      cues.subscribe(res => {
        let length = res.length;
        let i = 0;
        this.cards = [];
        res.forEach(cue => {
          i++;
          this.cards.push({
            front:{ id: cue.id,
                    length: String(length),
                    count: String(i),
                    rate: cue.rate,
                    timeStart: this.setRateTime(cue.rate, cue.timeStart),
                    title: "front-title: " + this.title,
                    subtitle: "front-subtitle: " + cue.question,
                    imageUrl: cue.imageUrl },
            back: { title: "back-title: " + this.title,
                    imageUrl: cue.imageUrl,
                    subtitle: "back-subtitle(question): " + cue.question,
                    content: "back-content(answer): " + cue.answer }
          })
        });
      });
  }

//   https://static.pexels.com/photos/34950/pexels-photo.jpg
//   http://www.nhm.ac.uk/content/dam/nhmwww/visit/Exhibitions/art-of-british-natural-history/magpie-illustration-keulemans-two-column.jpg
//   http://i.telegraph.co.uk/multimedia/archive/03598/lightning-10_3598416k.jpg

  ionViewDidLoad() {
    console.log('ionViewDidLoad CuesPage');
  }

  openModalAddCue() {
    this.openModal('AddCuePage');
  }
  
  openModal(pageName) {
    this.modalCtrl.create(pageName, {id: this.stackid}, { cssClass: 'inset-modal' }).present();
  }

  updateCueRate(card) {
    console.log("card.front.id=" + card.front.id + ', rate to [' + card.front.rate + '].');
    this.cueStack.updateCueRate(card.front.id, card.front.rate);
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

  // moment('2010-10-20').isSameOrAfter('2010-10-19'); // true
  // moment('2010-10-20').isSameOrAfter('2010-10-20'); // true
  // moment('2010-10-20').isSameOrAfter('2010-10-21'); // false
}
