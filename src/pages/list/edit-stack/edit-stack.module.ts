import { EditStackPage } from './edit-stack';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    EditStackPage,
  ],
  imports: [
    IonicPageModule.forChild(EditStackPage),
  ],
  exports: [
    EditStackPage
  ]
})

export class AddStackPageModule { }
