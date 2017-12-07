import { Component } from '@angular/core';
import { ViewController, IonicPage, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CueStackProvider } from '../../../providers/cuestack/cuestack';
import { Stack } from '../../../models/stack.model';

@IonicPage()
@Component({
  selector: 'page-add-stack',
  templateUrl: 'add-stack.html'
})
export class AddStackPage {
  stackForm: FormGroup;
  title: AbstractControl;
  description: AbstractControl;
  imageUrl: AbstractControl;
  editflag: AbstractControl;
  shareflag: AbstractControl;
  status: AbstractControl;
  card: Stack;
  
  constructor(
    public viewCtrl: ViewController, 
    public navParams: NavParams,     
    public fb: FormBuilder,
    public cueStack: CueStackProvider) {   
      this.stackForm = this.fb.group({  
        'title': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'description': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'imageUrl': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'status': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'editflag': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'shareflag': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
      });
      this.title = this.stackForm.controls['title'];  
      this.description = this.stackForm.controls['description'];  
      this.imageUrl = this.stackForm.controls['imageUrl'];  
      this.status = this.stackForm.controls['status'];
      this.editflag = this.stackForm.controls['editflag'];  
      this.shareflag = this.stackForm.controls['shareflag'];  
    }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  add(): void{
    let status = 'all';
    if (this.status !== null && this.status.value !== undefined && this.status.value !== '') {
      status = this.status.value;      
    }
    let shareflag = false;      
    if (this.shareflag !== null && this.shareflag.value !== undefined && this.shareflag.value !== '') {
      if (this.shareflag.value === 'public') {
        shareflag = true;
      } else {
        shareflag = false;      
      }
    }
    let editflag = '0';
    if (this.editflag !== null && this.editflag.value !== undefined && this.editflag.value !== '') {
      if (this.editflag.value === 'full control') {
        editflag = '1';
      } else {
        editflag = '0';      
      }
    }
    this.card = {
      title: this.title.value,
      description: this.description.value,
      imageUrl: this.imageUrl.value,
      shareflag: shareflag,
      editflag: editflag
    }
    //send message to add it into firebase
    this.cueStack.addStack(this.card, status);
    this.viewCtrl.dismiss({title: "new stack was added"});
  }
}
