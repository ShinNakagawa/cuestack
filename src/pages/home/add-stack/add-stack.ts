import { Component } from '@angular/core';
import { ViewController, IonicPage, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CueStackProvider } from '../../../providers/cuestack/cuestack';

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
  status: AbstractControl;
  
  constructor(
    public viewCtrl: ViewController, 
    public navParams: NavParams,     
    public fb: FormBuilder,
    public cueStack: CueStackProvider) {   
      this.stackForm = this.fb.group({  
        'title': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'description': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'imageUrl': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'status': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
      });
      this.title = this.stackForm.controls['title'];  
      this.description = this.stackForm.controls['description'];  
      this.imageUrl = this.stackForm.controls['imageUrl'];  
      this.status = this.stackForm.controls['status'];  
    }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  add(): void{    
    //send message to add it into firebase
    this.cueStack.addStack(this.title.value, this.description.value, this.imageUrl.value, this.status.value);
    this.viewCtrl.dismiss({title: "new stack was added"});
  }
}
