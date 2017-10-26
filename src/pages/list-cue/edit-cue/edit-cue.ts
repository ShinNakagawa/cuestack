import { Component } from '@angular/core';
import { ViewController, IonicPage, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CueStackProvider } from '../../../providers/cuestack/cuestack';
import { Cue } from '../../../models/cue.model';

@IonicPage()
@Component({
  selector: 'page-edit-cue',
  templateUrl: 'edit-cue.html'
})
export class EditCuePage {
  editCueForm: FormGroup;
  question: AbstractControl;
  answer: AbstractControl;
  imageUrl: AbstractControl;
  rate: AbstractControl;
  card: Cue;
  idrate: string;
  edrate: string;

  constructor(
    public viewCtrl: ViewController, 
    public navParams: NavParams,     
    public fb: FormBuilder,
    public cueStack: CueStackProvider) {
      let data = navParams.get('card');
      this.card = {
        id: data.id,
        question: data.question,
        answer: data.answer,
        imageUrl: data.imageUrl,
      }
      this.idrate = data.idrate;
      this.edrate = data.rate;
      this.editCueForm = this.fb.group({  
        'question': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'answer': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'imageUrl': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'rate': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
      });
      this.question = this.editCueForm.controls['question'];  
      this.answer = this.editCueForm.controls['answer'];  
      this.imageUrl = this.editCueForm.controls['imageUrl'];  
      this.rate = this.editCueForm.controls['rate'];  
    }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  update(): void{    
    this.card.question = this.question.value;
    this.card.answer = this.answer.value;
    this.card.imageUrl = this.imageUrl.value;
    if (this.rate.value !== undefined && this.rate.value !== '') {
      this.edrate = this.rate.value;      
    }    

    //send message to add it into firebase
    this.cueStack.updateCue(this.card);
    this.cueStack.updateCueRate(this.card.id, this.edrate, this.idrate);
    this.viewCtrl.dismiss({title: "cue was modified"});   
  }
}
