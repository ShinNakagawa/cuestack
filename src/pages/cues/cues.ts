import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CueStackProvider } from '../../providers/cuestack/cuestack';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-cues',
  templateUrl: 'cues.html',
})
export class CuesPage {
  stackid: any;
  currentUser: string;
  userid: string;
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
      this.stackid = [];
      this.stackid = navParams.get('id');
      //console.log("this.stackid=" + this.stackid.length);
      this.userid = navParams.get('userid');
      this.currentUser = navParams.get('currentUser');
      let index = 0;      
      this.cards = [];
      this.stackid.forEach(data =>{
        console.log('no' + String(index) + ': stackid=' + data.id);
        let cues = this.cueStack.getCues(data.id);
        cues.subscribe(res => {
          res.forEach(cue => {
            index++;
            this.cards.push({
              front:{ stackid: data.id,
                      id: cue.id,
                      count: String(index),
                      idrate: '',
                      rate: '',
                      timeStart: '',
                      title: "front-title: " + data.title,
                      subtitle: "front-subtitle: " + cue.question,
                      imageUrl: cue.imageUrl },
              back: { title: "back-title: " + data.title,
                      imageUrl: cue.imageUrl,
                      subtitle: "back-subtitle(question): " + cue.question,
                      content: "back-content(answer): " + cue.answer }
            })
          })
        })
      })

  }

//   https://static.pexels.com/photos/34950/pexels-photo.jpg
//   http://www.nhm.ac.uk/content/dam/nhmwww/visit/Exhibitions/art-of-british-natural-history/magpie-illustration-keulemans-two-column.jpg
//   http://i.telegraph.co.uk/multimedia/archive/03598/lightning-10_3598416k.jpg

  showRates() {
    this.cards.forEach(card =>{
      console.log("no=" + card.front.count + ', id=' + card.front.id);
      let cuerates = this.cueStack.getCueRates(card.front.id);
      cuerates.subscribe(resRate => {
        console.log('resRate length=' + String(resRate.length));
        let cuerate = resRate.find(item => item.userid === this.userid);
        if (cuerate) {
          console.log('found cuerate.id=' + cuerate.id + ', rate=' + cuerate.rate);
          card.front.idrate = cuerate.id;
          card.front.rate = cuerate.rate;
          card.front.timeStart = this.setRateTime(cuerate.rate, cuerate.timeStart);
        } else {
          console.log('not found cuerate: userid=[' + this.userid + '], card.front.id=[' + card.front.id + ']');
          //add cuerate
          this.cueStack.addCueRate(this.userid, card.front.stackid, card.front.id, card.front.idrate);            
        }
      })
    })
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
        this.showRates();
      }
    });
    addCueModel.present();
  }

  updateCueRate(card) {
    //console.log("card.front.id=" + card.front.id + ', rate to [' + card.front.rate + '].');
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
