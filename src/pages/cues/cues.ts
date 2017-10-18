import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CueStackProvider } from '../../providers/cuestack/cuestack';
import moment from 'moment';
import { CueRate } from '../../models/cuerate.model';

@IonicPage()
@Component({
  selector: 'page-cues',
  templateUrl: 'cues.html',
})
export class CuesPage {
  stackid: any;
  currentUser: string;
  cards: Array<{front: {
                  stackid: string, 
                  id: string,
                  count: string,
                  idrate: string;
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
      this.currentUser = navParams.get('currentUser');
      //this.loadCards();

  }

//   https://static.pexels.com/photos/34950/pexels-photo.jpg
//   http://www.nhm.ac.uk/content/dam/nhmwww/visit/Exhibitions/art-of-british-natural-history/magpie-illustration-keulemans-two-column.jpg
//   http://i.telegraph.co.uk/multimedia/archive/03598/lightning-10_3598416k.jpg

  loadCards() {
    let cuerates: CueRate[] = [];
    let list = this.cueStack.getCueRatesByUserID();
    if (list) {
      list.subscribe(result => {
        console.log("result=", result);
        result.forEach(rate => {
          cuerates.push(rate);
          console.log('got result')
        })
      })
    }

    this.cueStack.getCuesMultiStacks(this.stackid).subscribe(success => {
      let index = 0;      
      this.cards = [];
      success.subscribe(cues => {
        console.log('loadCards()::cues::length=', cues.length);
        cues.forEach(cue => {
          let checkData = this.cards.filter(item => item.front.id === cue.id);
          if (checkData.length > 0) {
            console.log('exits duplicated cue id=', cue.id);
          } else if (cue.id === undefined){
            console.log('cue.id is undefined');
          } else {
            // get rate data
            let cuerate = cuerates.find(data => data.cueid === cue.id);
            let idrate = '';
            let rate = '';
            let timeStart = '';
            if (cuerate) {
              console.log('found cuerate.id=' + cuerate.id + ', rate=' + cuerate.rate);
              idrate = cuerate.id;
              rate = cuerate.rate;
              timeStart = this.setRateTime(cuerate.rate, cuerate.timeStart);
            } else {
              console.log('not found cuerate with userid: cueid=' + cue.id);
              //add cuerate
              rate = 'new';
              idrate = this.cueStack.addCueRate(cue.stackid, cue.id, rate);            
            }
            console.log(cuerate);
            // store cue data
            index++;
            this.cards.push({
              front:{ stackid: cue.stackid,
                      id: cue.id,
                      count: String(index),
                      idrate: idrate,
                      rate: rate,
                      timeStart: timeStart,
                      title: "front-title: " + cue.stackid,
                      subtitle: "front-subtitle: " + cue.question,
                      imageUrl: cue.imageUrl },
              back: { title: "back-title: " + 'title',
                      imageUrl: cue.imageUrl,
                      subtitle: "back-subtitle(question): " + cue.question,
                      content: "back-content(answer): " + cue.answer }
            })
          }
        })
      })
    }, getCuesMultiStacksError => {
      console.log(getCuesMultiStacksError);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CuesPage');
  }

  openModalAddCue() {
    let addCueModel = this.modalCtrl.create('AddCuePage', {id: this.stackid[0].id}, { cssClass: 'inset-modal' });
    addCueModel.onDidDismiss(data => {
      console.log(data);
      if (data) {
        console.log("added cue");
      }
    });
    addCueModel.present();
  }

  updateCueRate(card) {
    console.log("card.front.id=" + card.front.id + ', rate to [' + card.front.rate + '].');
    this.cueStack.updateCueRate(card.front.idrate, card.front.rate);
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
