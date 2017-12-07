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
  editflag: AbstractControl;
  shareflag: AbstractControl;
  card: Stack;
  edstatus: string;
  idstatus: string;

  constructor(
    public viewCtrl: ViewController, 
    public navParams: NavParams,     
    public fb: FormBuilder,
    public cueStack: CueStackProvider) {
      let data = navParams.get('card');
      this.card = {
        id: data.id,
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        editflag: data.editflag,
        shareflag: data.shareflag,
      }
      this.edstatus = data.status;
      this.idstatus = data.idstatus;
      this.editStackForm = this.fb.group({  
        'title': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'description': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'imageUrl': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'status': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'editflag': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'shareflag': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
      });
      this.title = this.editStackForm.controls['title'];  
      this.description = this.editStackForm.controls['description'];  
      this.imageUrl = this.editStackForm.controls['imageUrl'];  
      this.status = this.editStackForm.controls['status'];  
      this.editflag = this.editStackForm.controls['editflag'];  
      this.shareflag = this.editStackForm.controls['shareflag'];  
    }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  update(): void{
    if (this.title.value !== undefined && this.title.value !== '') {
      this.card.title = this.title.value;      
    }        
    
    this.card.description = this.description.value;
    this.card.imageUrl = this.imageUrl.value;
    if (this.status !== null && this.status.value !== undefined && this.status.value !== '') {
      this.edstatus = this.status.value;      
    }        
    if (this.shareflag !== null && this.shareflag.value !== undefined && this.shareflag.value !== '') {
      if (this.shareflag.value === 'public') {
        this.card.shareflag = true;
      } else {
        this.card.shareflag = false;      
      }
    }
    if (this.editflag !== null && this.editflag.value !== undefined && this.editflag.value !== '') {
      if (this.editflag.value === 'full control') {
        this.card.editflag = '1';
      } else {
        this.card.editflag = '0';      
      }
    }
    //send message to add it into firebase
    this.cueStack.updateStack(this.card);
    this.cueStack.updateStackStatus(this.card.id, this.edstatus, this.idstatus);    
    this.viewCtrl.dismiss({idstatus: this.idstatus});
  }
}
