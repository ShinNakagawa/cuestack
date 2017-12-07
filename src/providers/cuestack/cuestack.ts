import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Cue } from '../../models/cue.model';
import { Stack } from '../../models/stack.model';
import { CueRate } from '../../models/cuerate.model';
import { StackStatus } from '../../models/stackstatus.model';
import moment from 'moment';

@Injectable()
export class CueStackProvider {
  user: firebase.User;
  
  constructor(private db: AngularFireDatabase,
              private afAuth: AngularFireAuth ) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
        console.log("CueStackProvider::userid=" + auth.uid);
      }
    });
  }

  logout() {
    this.user = null;
    console.log("CueStackProvider::logout");
  }

  get currentUserId(): string {
    return this.user !== null ? this.user.uid : '';   
  }

  //// ------------ CueRate Table --------------
  addCueRate(cueid: string, rate: string): string {
    const userid = this.user.uid;
    const timestamp = moment(new Date()).format('YYYY-MM-DD');
    let list = this.getCueRates(cueid);
    let key = list.push({
      userid: userid,
      cueid: cueid,
      rate: rate,
      timeStart: timestamp
    }).key;
    return key;
  }

  updateCueRate(cueid: string, rate: string, idrate: string): string {
    if (idrate === undefined || idrate ==='') {
      console.log('error in updateCueRate:: no data CueRate cueID=', cueid, ', userID=', this.user.uid);
      return this.addCueRate(cueid, rate);        
    } else {
      const path = `cues/${cueid}/rateAry/${idrate}`;
      const data = {
        rate: rate,
      };
      this.db.object(path).update(data)
        .catch(error => console.log(error));
      return idrate;
    }
  }

  getCueRates(cueid: string): FirebaseListObservable<CueRate[]> {
    if (this.user) {
        return this.db.list(`cues/${cueid}/rateAry`, {
        query: {
          limitToLast: 25,
          orderByChild: 'userid',
          equalTo: this.user.uid,
        }
      });
    } else {
      return null;
    }
  }
  //// ------------ CueRate Table --------------

  //// ------------ Cue Table --------------
  addCue(stackid: string, question: string, answer: string, imageUrl: string, rate: string) {  
    const timestamp = moment(new Date()).format('YYYY-MM-DD');
    const userid = this.user.uid;
    let list = this.getCues(stackid);
    let key = list.push({
      userid: userid,
      stackid: stackid,
      question: question,
      answer: answer,
      imageUrl: imageUrl,
      timeStart: timestamp,
    }).key;
    this.updateCueID(key);
    this.addCueRate(key, rate); 
  }

  updateCueID(key: string): void {
    const path = `cues/${key}`;
    const data = {
      id: key
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

  getCuesMultiStacks(stackid: any): Observable<FirebaseListObservable<Cue[]>> {
    return Observable.create(observer => {
      stackid.forEach(data => {
        let refData1: FirebaseListObservable<Cue[]>;
        console.log('getCuesMultiStacks::stackid=', data.id);
        refData1 = this.db.list('cues', {
          query: {
          limitToLast: 25,
          orderByChild: 'stackid',
          equalTo: data.id,
          }
        });
        observer.next(refData1);
      }), function(error) {
        observer.error(error);
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

    let checkOb = this.db.object(path);
    if (checkOb === null || checkOb === undefined){
      console.log('error in updateCue:: no data Cue with id=', cue.id);
    } else {
      this.db.object(path).update(data)
      .catch(error => console.log(error));
    }
  }
  //// ------------ Cue Table --------------

  //// ------------ Stack Table --------------
  addStack(card: Stack, status: string) {  
    const timestamp = moment(new Date()).format('YYYY-MM-DD');
    //const timestamp = new Date();
    const userid = this.user.uid;
    let list = this.getStacks();    
    let key = list.push({
      userid: userid,
      id: 'temp-key',
      title: card.title,
      description: card.description,
      imageUrl: card.imageUrl,
      timeStart: timestamp,
      editflag: card.editflag,
      shareflag: card.shareflag,
    }).key;
    this.updateStackID(key);
    this.addStackStatus(key, status);
  }

  getStacks(): FirebaseListObservable<Stack[]> {
    const userid = this.user.uid;
    return this.db.list('stacks', {
      query: {
        limitToLast: 25,
        orderByChild: 'userid',
        equalTo: userid,
      }
    });
  }

  getAllStacks(): Observable<FirebaseListObservable<Stack[]>> {
    return Observable.create(observer => {
      let refData2: FirebaseListObservable<Stack[]>;
      refData2 = this.db.list('stacks', {
        query: {
          limitToLast: 25,
          orderByChild: 'shareflag',
          equalTo: true,
        }
      })
      observer.next(refData2);
      console.log('got shared stacks');
      if (this.user) {
        let refData1: FirebaseListObservable<Stack[]>;
        refData1 = this.db.list('stacks', {
          query: {
            limitToLast: 25,
            orderByChild: 'userid',
            equalTo: this.user.uid,
          }
        })
        observer.next(refData1);
        console.log('got stacks with this.user.uid=', this.user.uid);
      }
      observer.complete();  
    });
  }

  updateStackShare(stackid: string, shareflag: boolean): void {
    const path = `stacks/${stackid}`;
    const data = {
      shareflag: shareflag
    };

    let checkOb = this.db.object(path);
    if (checkOb === null || checkOb === undefined){
      console.log('error in updateStackShare:: no data Stack with id=', stackid);
    } else {
      this.db.object(path).update(data)
      .catch(error => console.log(error));
    }
  }

  updateStackID(key: string): void {
    const path = `stacks/${key}`;
    const data = {
      id: key
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
      editflag: stack.editflag,
      shareflag: stack.shareflag
    };

    let checkOb = this.db.object(path);
    if (checkOb === null || checkOb === undefined){
      console.log('error in updateStack:: no data Stack with id=', stack.id);
    } else {
      this.db.object(path).update(data)
      .catch(error => console.log(error));
    }
  }
  //// ------------ Stack Table --------------

  deleteStack(key: string): void {
    // delete cues
    let list: FirebaseListObservable<Cue[]>;
    list = this.db.list('cues', {
      query: {
      limitToLast: 25,
      orderByChild: 'stackid',
      equalTo: key,
      }
    });
    list.subscribe((items) => {     
      // Remove the matching item:
      if (items.length) {
        this.deleteCue(items[0].id);
      }
    });

    // delete stack
    const path = `stacks/${key}`;
    this.db.object(path).remove()
      .catch(error => console.log(error));
  }

  deleteCue(key: string): void {
    const path = `cues/${key}`;
    this.db.object(path).remove()
      .catch(error => console.log(error));
  }


  addStackStatus(stackid: string, status: string): string {
    const userid = this.user.uid;
    const timestamp = moment(new Date()).format('YYYY-MM-DD');
    let list = this.getStackStatus(stackid);
    let key = list.push({
      userid: userid,
      status: status,
      timeStart: timestamp
    }).key;
    return key;
  }

  updateStackStatus(stackid: string, status: string, idstatus: string): string {
    if (idstatus === undefined || idstatus ==='') {
      console.log('error in updateStackStatus:: no data CueRate stackid=', stackid, ', userID=', this.user.uid);
      return this.addStackStatus(stackid, status);        
    } else {
      const path = `stacks/${stackid}/statusAry/${idstatus}`;
      const data = {
        status: status,
      };
      this.db.object(path).update(data)
        .catch(error => console.log(error));
      return idstatus;
    }
  }

  getStackStatus(stackid: string): FirebaseListObservable<StackStatus[]> {
    if (this.user) {
      return this.db.list(`stacks/${stackid}/statusAry`, {
        query: {
          limitToLast: 25,
          orderByChild: 'userid',
          equalTo: this.user.uid,
        }
      });
    } else {
      return null;
    }
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


  // class MyComp {
  //   questions: FirebaseListObservable<any[]>;
  //   value: FirebaseObjectObservable<any>;
  //   constructor(af: AngularFire) {
  //     this.questions = af.database.list('/questions');
  //     this.value = af.database.object('/value');
  //   } 
  //   addToList(item: any) {
  //     this.questions.push(item);
  //   }
  //   removeItemFromList(key: string) {
  //     this.questions.remove(key).then(_ => console.log('item deleted!'));
  //   }
  //   deleteEntireList() {
  //     this.questions.remove().then(_ => console.log('deleted!'));
  //   }
  //   setValue(data: any) {
  //     this.value.set(data).then(_ => console.log('set!'));
  //   }
  //   updateValue(data: any) {
  //     this.value.update(data).then(_ => console.log('update!'));
  //   }
  //   deleteValue() {
  //     this.value.remove().then(_ => console.log('deleted!'));
  //   }
  // }
}