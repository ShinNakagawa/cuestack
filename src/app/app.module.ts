import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
//firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
//pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CuesPage } from '../pages/cues/cues';
import { ListPage } from '../pages/list/list';
import { ListCuePage } from '../pages/list-cue/list-cue';
//components
import { FlashCardComponent } from '../components/flash-card/flash-card';
//pipes
import { MomentPipe } from '../pipes/moment/moment';
//providers
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { CueStackProvider } from '../providers/cuestack/cuestack';

export const firebaseConfig = {  
  apiKey: "AIzaSyAMjUz8wB5l0wWxoMpa0apGDYGlWXG-uLk",
  authDomain: "cuestacks.firebaseapp.com",
  databaseURL: "https://cuestacks.firebaseio.com",
  projectId: "cuestacks",
  storageBucket: "cuestacks.appspot.com",
  messagingSenderId: "250430045856"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    CuesPage,
    ListCuePage,
    FlashCardComponent,
    MomentPipe
  ],
  imports: [
    BrowserModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],  
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ListCuePage,
    CuesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    CueStackProvider
  ],
  exports: [
    FlashCardComponent,
    MomentPipe
  ]
})
export class AppModule {}
