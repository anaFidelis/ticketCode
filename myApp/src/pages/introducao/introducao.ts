import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the IntroducaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-introducao',
  templateUrl: 'introducao.html',
})
export class IntroducaoPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroducaoPage');
  }

  ShowTelaPrincipal(){
    this.storage.set('introducao','true');
    this.navCtrl.push(LoginPage);
  }

}
