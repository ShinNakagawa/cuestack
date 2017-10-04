import { AddStackPage } from './add-stack';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    AddStackPage,
  ],
  imports: [
    IonicPageModule.forChild(AddStackPage),
  ],
  exports: [
    AddStackPage
  ]
})

export class AddStackPageModule { }
