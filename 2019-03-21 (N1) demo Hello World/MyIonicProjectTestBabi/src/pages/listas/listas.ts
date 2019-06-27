import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { lista } from '../../providers/lista';
import { provedorProvider } from '../../providers/provedor/provedor';
import { ConfiguracoesdalistaPage } from '../configuracoesdalista/configuracoesdalista';
import { MinhaListaPage } from '../minha-lista/minha-lista';

/**
 * Generated class for the ListasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listas',
  templateUrl: 'listas.html',
})
export class ListasPage {

  listas: Array<lista>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private provedor: provedorProvider) {
  }

  ionViewDidLoad() {
    this.provedor.BuscarListas().subscribe(
      data => {
        const response = (data as any);
        const retorno = JSON.parse(response._body);
        this.listas = retorno;
        console.log(this.listas);
      }, error => {
        console.log(error);
      }

    )
  }

  criarLista() {
    this.navCtrl.push(ConfiguracoesdalistaPage);
  }

  showMinhaLista(lista: lista) {
    this.navCtrl.push(MinhaListaPage,{lista: lista});
  }
}
