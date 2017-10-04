import { Component } from '@angular/core';
import { ViewController, IonicPage } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthProvider } from '../../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signupForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  username: AbstractControl;
  error: any;
  
  constructor(private viewCtrl: ViewController,
    private fb: FormBuilder,
    private auth: AuthProvider) {
      this.signupForm = this.fb.group({  
        'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'username': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
      });
      this.email = this.signupForm.controls['email'];     
      this.password = this.signupForm.controls['password'];
      this.username = this.signupForm.controls['username'];
    }

  signup() {
    if(this.signupForm.valid) {
      var credentials = ({email: this.email.value, password: this.password.value, username: this.username.value});
      this.auth.registerUser(credentials).subscribe(registerData => {
          console.log(registerData);
          alert('User is registered and logged in.');
          this.viewCtrl.dismiss();
        }, registerError => {
        console.log(registerError);
        if (registerError.code === 'auth/weak-password' || registerError.code === 'auth/email-already-in-use')
        {
          alert(registerError.message);
        }
        this.error = registerError;
      });
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
