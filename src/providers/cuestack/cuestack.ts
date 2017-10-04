import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Cue } from '../../models/cue.model';
import { Stack } from '../../models/stack.model';
import moment from 'moment';

@Injectable()
export class CueStackProvider {
  user: firebase.User;
  cues: FirebaseListObservable<Cue[]>;
  stacks: FirebaseListObservable<Stack[]>;
  userName: Observable<string>;

  constructor(private db: AngularFireDatabase,
              private afAuth: AngularFireAuth ) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
      this.getUser().subscribe(a => {
        this.userName = a.displayName;
      });
    });
  }

  getUser() {
    const userId = this.user.uid;
    const path = `/users/${userId}`;
    return this.db.object(path);
  }

  getUsers() {
    const path = '/users';
    return this.db.list(path);
  }

  addCue(stackid: string, question: string, answer: string, imageUrl: string, rate: string) {  
    const timestamp = moment(new Date()).format('YYYY-MM-DD');
    const userid = this.user.uid;
    this.cues = this.getCues(stackid);
    let key = this.cues.push({
      userid: userid,
      stackid: stackid,
      question: question,
      answer: answer,
      imageUrl: imageUrl,
      rate: rate,
      timeStart: timestamp
      //timeStart: firebase.database.ServerValue.TIMESTAMP,
    }).key;
    this.updateCueID(key);
  }

  updateCueID(key: string): void {
    const path = `cues/${key}`;
    const data = {
      id: key
    };
    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  updateCueRate(id: string, rate: string): void {
    const path = `cues/${id}`;
    const data = {
      rate: rate,
      //timeStart: firebase.database.ServerValue.TIMESTAMP,
    };
    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  getCues(stackid: string): FirebaseListObservable<Cue[]> {
    return this.db.list('cues', {
      query: {
        limitToLast: 25,
        orderByChild: 'stackid',
        equalTo: stackid,
      }
    });
  }

  updateCue(cue: Cue): void {
    const path = `cues/${cue.id}`;
    const data = {
      question: cue.question,
      answer: cue.answer,
      imageUrl: cue.imageUrl,
      rate: cue.rate
    };
    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  deleteCue(key: string): void {
    const path = `cues/${key}`;
    this.db.object(path).remove()
      .catch(error => console.log(error));
  }

  addStack(title: string, description: string, imageUrl: string, status: string) {  
    const timestamp = moment(new Date()).format('YYYY-MM-DD');
    //const timestamp = new Date();
    const userid = this.user.uid;
    this.stacks = this.getStacks(userid);
    let key = this.stacks.push({
      userid: userid,
      id: 'temp-key',
      title: title,
      description: description,
      imageUrl: imageUrl,
      status: status,
      timeStart: timestamp,
      //timeStart: firebase.database.ServerValue.TIMESTAMP,
    }).key;
    this.updateStackID(key);
  }

  getStacks(userid: string): FirebaseListObservable<Stack[]> {
    return this.db.list('stacks', {
      query: {
        limitToLast: 25,
        orderByChild: 'userid',
        equalTo: userid,
      }
    });
  }

  // getPublicStacks(): FirebaseListObservable<Stack[]> {
  //   return this.db.list('stacks', {
  //     query: {
  //       limitToLast: 25,
  //       orderByChild: 'shared',
  //       equalTo: 'public',
  //     }
  //   });
  // }

  updateStackID(key: string): void {
    const path = `stacks/${key}`;
    const data = {
      id: key
    };
    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  updateStackStatus(stackid: string, status: string): void {
    const path = `stacks/${stackid}`;
    const data = {
      status: status
    };
    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  updateStack(stack: Stack): void {
    const path = `stacks/${stack.id}`;
    const data = {
      title: stack.title,
      description: stack.description,
      imageUrl: stack.imageUrl,
      status: stack.status
    };
    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  deleteStack(key: string): void {
    const path = `stacks/${key}`;
    this.db.object(path).remove()
      .catch(error => console.log(error));
  }

  // getTimeStamp() {
  //   const now = new Date();
  //   const date = now.getUTCFullYear() + '/' +
  //                (now.getUTCMonth() + 1) + '/' +
  //                now.getUTCDate();
  //   const time = now.getUTCHours() + ':' +
  //                now.getUTCMinutes() + ':' +
  //                now.getUTCSeconds();
  //   return (date + ' ' + time);
  // }

}
