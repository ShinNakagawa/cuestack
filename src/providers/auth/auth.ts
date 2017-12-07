import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthProvider {
  private user: Observable<firebase.User>;
  private authState: any;
  
  constructor(
    private db: AngularFireDatabase,
    private af: AngularFireAuth) {
      this.user = af.authState;
  }

  login(email: string, password: string) {
    return this.af.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this.setUserStatus('online');        
      //  console.log("success to log in");
      }).catch((error) => {
        console.log(error);
      });
  }

  logout() {
    this.af.auth.signOut();
  //  console.log("success to log out");
  }

  get currentUserId(): string {
    return this.authState !== null ? this.authState.uid : '';
  }

  registerUser(credentials: any) {
    return Observable.create(observer => {
      this.af.auth.createUserWithEmailAndPassword(credentials.email, credentials.password).then(authData => {
        observer.next(authData);
        this.authState = authData;
        const status = 'online';
        this.setUserData(credentials.email, credentials.username, status);        
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  setUserData(email: string, displayName: string, status: string): void {
    const path = `users/${this.currentUserId}`;
    const data = {
      email: email,
      displayName: displayName,
      status: status,
      'Rate': {
        bad: 1,
        good: 10,
        never: 100
      }
    };

    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  setUserStatus(status: string): void {
    const path = `users/${this.currentUserId}`;
    const data = {
      status: status
    };

    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  get currentUser():string{
    return this.af.auth.currentUser?this.af.auth.currentUser.email:null;
  } 
  
  authUser() {
    return this.user;
  }

  resetPassword(emailAddress:string){
    return Observable.create(observer => {
      this.af.auth.sendPasswordResetEmail(emailAddress).then(function(success) {
          //console.log('email sent', success);
          observer.next(success);
        }, function(error) {
          //console.log('error sending email',error);
          observer.error(error);
        });
     });
  }

}
