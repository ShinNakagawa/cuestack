import { Component } from '@angular/core';
import { ViewController, IonicPage, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CueStackProvider } from '../../../providers/cuestack/cuestack';
import { Stack } from '../../../models/stack.model';

@IonicPage()
@Component({
  selector: 'page-edit-stack',
  templateUrl: 'edit-stack.html'
})
export class EditStackPage {
  editStackForm: FormGroup;
  title: AbstractControl;
  description: AbstractControl;
  imageUrl: AbstractControl;
  status: AbstractControl;
  shareflag: AbstractControl;
  card: Stack;

  constructor(
    public viewCtrl: ViewController, 
    public navParams: NavParams,     
    public fb: FormBuilder,
    public cueStack: CueStackProvider) {
      let title = navParams.get('title');
      let description = navParams.get('description');
      let id = navParams.get('id');
      let imageUrl = navParams.get('imageUrl');
      let status = navParams.get('status');
      let shareflag = navParams.get('shareflag');
      this.card = {
        id: id,
        title: title,
        description: description,
        imageUrl: imageUrl,
        status: status,
        shareflag: shareflag
      }
      this.editStackForm = this.fb.group({  
        'title': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'description': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'imageUrl': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'status': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'shareflag': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
      });
      this.title = this.editStackForm.controls['title'];  
      this.description = this.editStackForm.controls['description'];  
      this.imageUrl = this.editStackForm.controls['imageUrl'];  
      this.status = this.editStackForm.controls['status'];  
      this.shareflag = this.editStackForm.controls['shareflag'];  
    }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  update(): void{    
    this.card.title = this.title.value;
    this.card.description = this.description.value;
    this.card.imageUrl = this.imageUrl.value;
    this.card.status = this.status.value;
    this.card.shareflag = this.shareflag.value;

    //send message to add it into firebase
    this.cueStack.updateStack(this.card);
    this.viewCtrl.dismiss();   
    //this.viewCtrl.dismiss({title: "new stack was added"});
  }
}
