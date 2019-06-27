import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IntroducaoPageModule } from '../pages/introducao/introducao.module';
import { LoginPageModule } from '../pages/login/login.module';
import { IonicStorageModule } from '@ionic/storage';
import { CriarContaPageModule } from '../pages/criar-conta/criar-conta.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { provedorProvider } from '../providers/provedor/provedor';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ConfiguracoesdalistaPageModule } from '../pages/configuracoesdalista/configuracoesdalista.module';
import { FilmePageModule } from '../pages/filme/filme.module';
import { ListasPageModule } from '../pages/listas/listas.module';
import { ConfigContaPageModule } from '../pages/config-conta/config-conta.module';
import { MinhaListaPageModule } from '../pages/minha-lista/minha-lista.module';
import { ImagensPageModule } from '../pages/imagens/imagens.module';

import { IonMaskModule } from '@pluritech/ion-mask';

const configFireBase = {
  apiKey: "AIzaSyAocUCC5xOKTwyBxpLuDMdLpYCge1dtxIM",
  authDomain: "ticketcode-abg.firebaseapp.com",
  databaseURL: "https://ticketcode-abg.firebaseio.com",
  projectId: "ticketcode-abg",
  storageBucket: "ticketcode-abg.appspot.com",
  messagingSenderId: "742307823695"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IntroducaoPageModule,
    LoginPageModule,
    IonicStorageModule,
    IonicStorageModule.forRoot(),
    CriarContaPageModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(configFireBase),
    AngularFireDatabaseModule,
    HttpClientModule,
    HttpModule,
    ConfiguracoesdalistaPageModule,
    FilmePageModule,
    ListasPageModule,
    ConfigContaPageModule,
    MinhaListaPageModule,
    ImagensPageModule,
    IonMaskModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    provedorProvider
  ]
})
export class AppModule { }
