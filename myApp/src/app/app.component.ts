import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IntroducaoPage } from '../pages/introducao/introducao';
import { LoginPage } from '../pages/login/login';
import { Storage } from '@ionic/storage';
import { ConfiguracoesdalistaPage } from '../pages/configuracoesdalista/configuracoesdalista';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = IntroducaoPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage: Storage) {  
    this.storage.get('introducao').then((introducao) => {
      if (introducao) {
        this.rootPage = LoginPage;
        //mudar linha acima XD
      } else {
        this.rootPage = IntroducaoPage;  
      }
    });    

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide(); 


    });
  }
}
