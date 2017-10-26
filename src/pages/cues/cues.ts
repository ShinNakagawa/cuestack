import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
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
                  rate: string,
                  idrate: string,
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
    private cueStack: CueStackProvider,
    private auth: AuthProvider) {
      this.stackid = navParams.get('id');
      this.currentUser = navParams.get('currentUser');
      this.loadCards();
  }

//   https://static.pexels.com/photos/34950/pexels-photo.jpg
//   http://www.nhm.ac.uk/content/dam/nhmwww/visit/Exhibitions/art-of-british-natural-history/magpie-illustration-keulemans-two-column.jpg
//   http://i.telegraph.co.uk/multimedia/archive/03598/lightning-10_3598416k.jpg

  loadCards() {
    let userid = this.cueStack.currentUserId;
    let index = 0;      
    this.cards = [];
    this.cueStack.getCuesMultiStacks(this.stackid).subscribe(success => {
      success.subscribe(cues => {
        cues.forEach(cue => {
          let checkData = this.cards.filter(item => item.front.id === cue.id);
          if (checkData.length > 0) {
            console.log('exits duplicated cue id=', cue.id);
            // update rate data
            if (cue.rateAry === null || cue.rateAry === undefined){
              console.log('skip to update cue::rate[', cue.id, '] into cards because cue.rateAry is null or undefined.')
            } else {
              Object.keys(cue.rateAry).map(function(rateIndex){
                let cueRate = new CueRate;
                cueRate = cue.rateAry[rateIndex];
                if (cueRate.userid === userid){
                  checkData[0].front.rate = cueRate.rate;
                  checkData[0].front.idrate = rateIndex;
                  checkData[0].front.timeStart = cueRate.timeStart;            
                }
              })
              //update rate time start
              if (checkData[0].front.rate !== '' && checkData[0].front.rate !== undefined) {
                checkData[0].front.timeStart = this.setRateTime(checkData[0].front.rate, checkData[0].front.timeStart);
              }
            }            
          } else if (cue.id === undefined){
            console.log('cue.id is undefined');
          } else {
            if (cue.rateAry === null || cue.rateAry === undefined){
              console.log('skip to update cue::rate[', cue.id, '] into cards because cue.rateAry is null or undefined.')
            } else {
              let rate = '';
              let idrate = '';
              let timeStart = '';
              // get rate data
              Object.keys(cue.rateAry).map(function(rateIndex){
                let cueRate = new CueRate;
                cueRate = cue.rateAry[rateIndex];
                console.log('rateIndex=', rateIndex);
                console.log('cueRate in loop=', cueRate);
                console.log('cueRate.rate=', cueRate.rate);
                if (cueRate.userid === userid){
                  rate = cueRate.rate;
                  idrate = rateIndex;
                  timeStart = cueRate.timeStart;
                }
              })
              //update rate time start
              if (rate !== '' && idrate !== '' && timeStart !== '') {
                timeStart = this.setRateTime(rate, timeStart);
              }             
              // store cue data
              index++;
              this.cards.push({
                front:{ stackid: cue.stackid,
                        id: cue.id,
                        count: String(index),
                        rate: rate,
                        idrate: idrate,
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
      //console.log(data);
      if (data) {
        console.log("CuesPage::openModelAddCue() added cue");
        this.loadCards();
      }
    });
    addCueModel.present();
  }

  updateCueRate(card) {
    let userid = '';
    if (this.auth.currentUser) {       
      userid = this.cueStack.currentUserId;
    }
    if (userid !== '') {       
      console.log("card.front.id=" + card.front.id + ', rate to [' + card.front.rate + '].');
      card.front.idrate = this.cueStack.updateCueRate(card.front.id, card.front.rate, card.front.idrate);
    } else {
      alert('Please log in to update rate.');                
      card.front.rate = '';
    }      
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
