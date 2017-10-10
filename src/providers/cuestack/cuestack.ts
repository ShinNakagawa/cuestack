import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Cue } from '../../models/cue.model';
import { Stack } from '../../models/stack.model';
import { CueRate } from '../../models/cuerate.model';
import moment from 'moment';

@Injectable()
export class CueStackProvider {
  user: firebase.User;
  cues: FirebaseListObservable<Cue[]>;
  cuerates: FirebaseListObservable<CueRate[]>;
  stacks: FirebaseListObservable<Stack[]>;
  userName: Observable<string>;

  constructor(private db: AngularFireDatabase,
              private afAuth: AngularFireAuth ) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
        console.log("CueStackProvider::userid=" + auth.uid);
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
      //rate: rate,
      timeStart: timestamp,
    }).key;
    this.updateCueID(key);
    this.addCueRate(userid, stackid, key, rate); 
  }

  updateCueID(key: string): void {
    const path = `cues/${key}`;
    const data = {
      id: key
    };
    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  addCueRate(userid: string, stackid: string, cueid: string, rate: string) {  
    const timestamp = moment(new Date()).format('YYYY-MM-DD');
    this.cuerates = this.getCueRates(cueid);
    let key = this.cuerates.push({
      userid: userid,
      stackid: stackid,
      cueid: cueid,
      rate: rate,
      timeStart: timestamp
    }).key;
    this.updateCueRateID(key);
  }

  updateCueRateID(key: string): void {
    const path = `cuerates/${key}`;
    const data = {
      id: key
    };
    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  updateCueRate(id: string, rate: string): void {
    const path = `cuerates/${id}`;
    const data = {
      rate: rate,
      //timeStart: firebase.database.ServerValue.TIMESTAMP,
    };
    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  getCueRates(cueid: string): FirebaseListObservable<CueRate[]> {
    return this.db.list('cuerates', {
      query: {
        limitToLast: 25,
        orderByChild: 'cueid',
        equalTo: cueid,
      }
    });
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
      imageUrl: cue.imageUrl
    };
    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  deleteCue(key: string): void {
    const path = `cues/${key}`;
    this.db.object(path).remove()
      .catch(error => console.log(error));
  }

  deleteCueRate(key: string): void {
    const path = `cuerates/${key}`;
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
      shareflag: false,
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

  getShareStacks(shareflag: boolean): FirebaseListObservable<Stack[]> {
    return this.db.list('stacks', {
      query: {
        limitToLast: 25,
        orderByChild: 'shareflag',
        equalTo: shareflag,
      }
    });
  }

  updateStackShare(stackid: string, shareflag: boolean): void {
    const path = `stacks/${stackid}`;
    const data = {
      shareflag: shareflag
    };
    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

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
      status: stack.status,
      shareflag: stack.shareflag
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
