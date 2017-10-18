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
  // cues: FirebaseListObservable<Cue[]>;
  // cuerates: FirebaseListObservable<CueRate[]>;
  // stacks: FirebaseListObservable<Stack[]>;

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
      //rate: rate,
      timeStart: timestamp,
    }).key;
    this.updateCueID(key);
    this.addCueRate(stackid, key, rate); 
  }

  updateCueID(key: string): void {
    const path = `cues/${key}`;
    const data = {
      id: key
    };
    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  addCueRate(stackid: string, cueid: string, rate: string): string {
    const userid = this.user.uid;
    const timestamp = moment(new Date()).format('YYYY-MM-DD');
    let list = this.getCueRates();
    let key = list.push({
      userid: userid,
      stackid: stackid,
      cueid: cueid,
      rate: rate,
      timeStart: timestamp
    }).key;
    this.updateCueRateID(key);
    return key;
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

    let checkOb = this.db.object(path);
    if (checkOb === null || checkOb === undefined){
      console.log('error: no data CueRate with id=', id);
    } else {
      this.db.object(path).update(data)
      .catch(error => console.log(error));
    }
  }

  getCueRates(): FirebaseListObservable<CueRate[]> {
    return this.db.list('cuerates', {
      query: {
        limitToLast: 25,
        orderByChild: 'userid',
        equalTo: this.user.uid,
      }
    });
  }

  getCueRatesByUserID(): FirebaseListObservable<CueRate[]> {
    if (this.user) {
      return this.db.list('cuerates', {
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

  getCues(stackid: string): FirebaseListObservable<Cue[]> {
    return this.db.list('cues', {
      query: {
        limitToLast: 25,
        orderByChild: 'stackid',
        equalTo: stackid,
      }
    });
  }

  // http://reactivex.io/rxjs/manual/overview.html#creating-observables
  // https://github.com/angular/angularfire2/issues/162

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
    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  addStack(title: string, description: string, imageUrl: string, status: string) {  
    const timestamp = moment(new Date()).format('YYYY-MM-DD');
    //const timestamp = new Date();
    const userid = this.user.uid;
    let list = this.getStacks();
    let key = list.push({
      userid: userid,
      id: 'temp-key',
      title: title,
      description: description,
      imageUrl: imageUrl,
      status: '',
      timeStart: timestamp,
      shareflag: false,
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

  // getShareStacks(shareflag: boolean): FirebaseListObservable<Stack[]> {
  //   return this.db.list('stacks', {
  //     query: {
  //       limitToLast: 25,
  //       orderByChild: 'shareflag',
  //       equalTo: shareflag,
  //     }
  //   });
  // }

  getAllStacks(): Observable<FirebaseListObservable<Stack[]>> {
    return Observable.create(observer => {
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
      observer.complete();  
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

    // delete stack status
    let listS: FirebaseListObservable<StackStatus[]>;
    listS = this.db.list('statckstatus', {
      query: {
      limitToLast: 25,
      orderByChild: 'stackid',
      equalTo: key,
      }
    });
    listS.subscribe((items) => {     
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
    // delete cuerate data on this cue
    let list: FirebaseListObservable<CueRate[]>;
    list = this.db.list('cuerates', {
      query: {
      limitToLast: 25,
      orderByChild: 'cueid',
      equalTo: key,
      }
    });
    list.subscribe((items) => {     
        // Remove the matching item:
        if (items.length) {
          list.remove(items[0].id)
            .then(() => console.log('removed ' + items[0].id))
            .catch((error) => console.log(error));
        }
    });
    // delete cue
    const path = `cues/${key}`;
    this.db.object(path).remove()
      .catch(error => console.log(error));
  }



















  addStackStatus(stackid: string, status: string): string {
    const userid = this.user.uid;
    const timestamp = moment(new Date()).format('YYYY-MM-DD');
    let list = this.getStackStatus();
    let key = list.push({
      userid: userid,
      stackid: stackid,
      status: status,
      timeStart: timestamp
    }).key;
    this.updateStackStatusID(key);
    return key;
  }

  updateStackStatusID(key: string): void {
    const path = `stackstatus/${key}`;
    const data = {
      id: key
    };
    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  // updateStackStatus(id: string, status: string): void {
  //   const path = `stackstatus/${id}`;
  //   const data = {
  //     status: status,
  //     //timeStart: firebase.database.ServerValue.TIMESTAMP,
  //   };
  //   this.db.object(path).update(data)
  //     .catch(error => console.log(error));
  // }

  getStackStatus(): FirebaseListObservable<StackStatus[]> {
    if (this.user) {
      return this.db.list('stackstatus', {
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



  // deleteCueRate(key: string): void {
  //   const path = `cuerates/${key}`;
  //   this.db.object(path).remove()
  //     .catch(error => console.log(error));
  // }

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