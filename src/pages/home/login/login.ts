import { Component } from '@angular/core';
import { ViewController, IonicPage } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthProvider } from '../../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loginForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  
  constructor(private viewCtrl: ViewController,
    private fb: FormBuilder,
    private auth: AuthProvider) {
      this.loginForm = this.fb.group({  
        'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
      });
      this.email = this.loginForm.controls['email'];     
      this.password = this.loginForm.controls['password'];
  }

  login() {
    //console.log('login() called from Login Pge [' + this.email.value + "][" + this.password.value + "]");
    this.auth.login(this.email.value, this.password.value).then(res =>{
      this.viewCtrl.dismiss(res);
    })
    .catch(error => {
      console.log(error);
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
