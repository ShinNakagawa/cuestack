import { Component } from '@angular/core';
import { ViewController, IonicPage, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CueStackProvider } from '../../../providers/cuestack/cuestack';

@IonicPage()
@Component({
  selector: 'page-add-cue',
  templateUrl: 'add-cue.html'
})
export class AddCuePage {
  cueForm: FormGroup;
  question: AbstractControl;
  answer: AbstractControl;
  imageUrl: AbstractControl;
  rate: AbstractControl;
  stackid: string;

  constructor(
    public viewCtrl: ViewController, 
    public navParams: NavParams,
    public fb: FormBuilder,
    public cueStack: CueStackProvider) {
      this.stackid = navParams.get('id');
      this.cueForm = this.fb.group({  
        'question': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'answer': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'imageUrl': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'rate': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
      });
      this.question = this.cueForm.controls['question'];  
      this.answer = this.cueForm.controls['answer'];  
      this.imageUrl = this.cueForm.controls['imageUrl'];  
      this.rate = this.cueForm.controls['rate'];  
    }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  add(): void{
    //console.log("question: " + this.question.value + ", answer: " + this.answer.value + ", id=" + this.stackid);  
    //send message to add it into firebase
    this.cueStack.addCue(this.stackid, this.question.value, this.answer.value, this.imageUrl.value, this.rate.value);
    //clear chat text
    this.question.reset("");
    this.answer.reset("");
    
    this.viewCtrl.dismiss();    
  }
}
