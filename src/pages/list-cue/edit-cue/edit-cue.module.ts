import { EditCuePage } from './edit-cue';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    EditCuePage,
  ],
  imports: [
    IonicPageModule.forChild(EditCuePage),
  ],
  exports: [
    EditCuePage
  ]
})

export class AddStackPageModule { }
