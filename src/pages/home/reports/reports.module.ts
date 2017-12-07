import { ReportsPage } from './reports';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    ReportsPage,
  ],
  imports: [
    IonicPageModule.forChild(ReportsPage),
  ],
  exports: [
    ReportsPage
  ]
})

export class ReportsPageModule { }
