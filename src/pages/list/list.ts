import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { CueStackProvider } from '../../providers/cuestack/cuestack';
import { ListCuePage } from '../list-cue/list-cue';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  cards: Array<{title: string, imageUrl: string, description: string, id: string, status: string}>;
  status: string;
  userid : string;

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private cueStack: CueStackProvider,
    private auth: AuthProvider) {
      console.log("status=" + this.status);
      let user = this.auth.authUser();
      user.subscribe(data => {
        if (data) {
          this.userid = data.uid;
          let stacks = this.cueStack.getStacks(this.userid);
          stacks.subscribe(res => {
            this.cards = [];   
            res.forEach(stack => {
              this.cards.push({
                title: stack.title,
                description: stack.description,
                imageUrl: stack.imageUrl,
                id: stack.id,
                status: stack.status
              })
            });
          });
        }
      });

   }

  cardTapped(event, card) {
    this.navCtrl.push(ListCuePage, {title: card.title, id: card.id});    
  }

  reportsPage(card) {
    this.modalCtrl.create('ReportsPage', {title: card.title, id: card.id, userid: this.userid}, { cssClass: 'inset-modal' })
    .present();
  }


  delete(card) {
    alert('Deleting ' + card.title);
    this.cueStack.deleteStack(card.id);
  }

  edit(card) {
    this.modalCtrl.create('EditStackPage', {
      id: card.id,
      title: card.title,
      description: card.description,
      imageUrl: card.imageUrl,
      status: card.status}, { cssClass: 'inset-modal' })
    .present();
  }

}
