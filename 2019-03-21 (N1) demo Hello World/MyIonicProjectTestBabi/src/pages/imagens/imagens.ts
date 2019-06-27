import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ConfiguracoesdalistaPage } from '../configuracoesdalista/configuracoesdalista';

/**
 * Generated class for the ImagensPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-imagens',
  templateUrl: 'imagens.html',
})
export class ImagensPage {

  imagens: any[] = [];
  imagemSelec: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {

    this.imagens = [
      { img: 'myfilme (1).png' },
      { img: 'myfilme (2).png' },
      { img: 'myfilme (3).png' },
      { img: 'myfilme (4).png' },
      { img: 'myfilme (5).png' },
      { img: 'myfilme (6).png' },
      { img: 'myfilme (7).png' },
      { img: 'myfilme (8).png' },
      { img: 'myfilme (9).png' },
      { img: 'myfilme (10).png' },
      { img: 'myfilme (11).png' },
      { img: 'myfilme (12).png' },
      { img: 'myfilme (13).png' },
      { img: 'myfilme (14).png' },
      { img: 'myfilme (15).png' }];

  }

  ionViewDidLoad() {

  }

  selcionarImagem(img: String) {
    this.imagemSelec = img;
    this.viewCtrl.dismiss({ imagem: img });
  }
}
