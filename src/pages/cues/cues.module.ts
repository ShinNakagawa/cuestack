import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CuesPage } from './cues';
import { FlashCardComponent } from '../../components/flash-card/flash-card';

@NgModule({
  declarations: [
    CuesPage,
  ],
  imports: [
    IonicPageModule.forChild(CuesPage),
    FlashCardComponent    
  ],
  exports: [
    CuesPage
  ]
})
export class CuesPageModule {}
