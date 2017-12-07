import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { CueStackProvider } from '../../providers/cuestack/cuestack';
import moment from 'moment';
import { StackStatus } from '../../models/stackstatus.model';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  cards: Array<{id: string, 
                checked: boolean, 
                title: string, 
                imageUrl: string, 
                description: string, 
                status: string, 
                idstatus: string, 
                timeStart: any, 
                shareflag: boolean}>;
  checked: boolean;
  value: string;
  keptCards: any;
  
  constructor(
    private cueStack: CueStackProvider,
    public alertCtrl: AlertController,
    private auth: AuthProvider) {
      this.checked = false;
      this.value = '1';
      this.keptCards = null;
      this.loadCards();
   }

  loadCards() {
    if (this.auth.currentUser) {       
      let stacks = this.cueStack.getStacks();
      stacks.subscribe(res => {
        this.cards = [];   
        res.forEach(stack => {
          if (stack.statusAry === null || stack.statusAry === undefined){
            console.log('skip to add stack[', stack.id, '] into cards because stack.statusAry is null or undefined.')
          } else if ( this.keptCards ) {
            console.log('skip to add stack because it is still in search mode')
          } else {
            let userid = this.cueStack.currentUserId;
            let status = '';
            let idstatus = '';
            Object.keys(stack.statusAry).map(function(statusIndex){
              let stackStatus = new StackStatus;
              stackStatus = stack.statusAry[statusIndex];
              console.log('stackStatus in loop=', stackStatus);
              console.log('stackStatus.status=', stackStatus.status);
              if (stackStatus.userid === userid){
                status = stackStatus.status;
                idstatus = statusIndex;
              }
            })
            // add stack into cards
            this.cards.push({
              id: stack.id,
              checked: false,
              title: stack.title,
              description: stack.description,
              imageUrl: stack.imageUrl,
              status: status,
              idstatus: idstatus,
              shareflag: stack.shareflag,
              timeStart: moment(stack.timeStart, 'YYYY-MM-DD').calendar()
            })
          }
        });
      });
    }
  }

  cardTapped(event, card) {
    const alert = this.alertCtrl.create();
    alert.setTitle(card.title);
    alert.present();   
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
    this.keptCards = null;           
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
    this.cards = this.query(this.cards, {title: val, description: val});
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
    this.loadCards();
  }

  onCancel(event) {
    this.initializeSearch();
    this.keptCards = null;
    this.loadCards();      
  }
  // Search functions=======================================

  edit(card) {
    const alert = this.alertCtrl.create();
    alert.setTitle(card.title);
    alert.present();    
  }

  report(card) {
    const alert = this.alertCtrl.create();
    alert.setTitle(card.title);
    alert.present();
  }

}
