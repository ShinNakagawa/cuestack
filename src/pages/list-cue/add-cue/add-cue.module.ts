import { AddCuePage } from './add-cue';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    AddCuePage,
  ],
  imports: [
    IonicPageModule.forChild(AddCuePage),
  ],
  exports: [
    AddCuePage
  ]
})

export class AddCuePageModule { }
