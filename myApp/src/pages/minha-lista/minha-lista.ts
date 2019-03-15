import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, LoadingController, List } from 'ionic-angular';
import { filme } from '../../providers/filme';
import { provedorProvider } from '../../providers/provedor/provedor';
import { FilmePage } from '../filme/filme';
import { lista } from '../../providers/lista';
import { ConfiguracoesdalistaPage } from '../configuracoesdalista/configuracoesdalista';

/**
 * Generated class for the MinhaListaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-minha-lista',
  templateUrl: 'minha-lista.html',
})
export class MinhaListaPage {

  public listaFilmes = [];
  public filmeSelec: filme;
  public lista: lista;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private provedor: provedorProvider,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController) {
    this.lista = navParams.get('lista');
  }

  ionViewDidLoad() {
    this.provedor.getFilmesLista(this.lista).subscribe(
      data => {
        const response = (data as any);
        const retorno = JSON.parse(response._body);
        let filmeList = retorno;
        for (let i = 0; i < filmeList.length; i++) {
          this.provedor.getFilme(filmeList[i].codFilme).subscribe(
            dat => {
              const response = (dat as any);
              const retorno = JSON.parse(response._body);
              this.listaFilmes.push(retorno);
            }, err => {
              console.log(err);
            })
        }

      })
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Carregando Filme...",
      duration: 3000
    });
    loader.present();
  }

  showPageFilme(id: number) {
    this.provedor.getFilme(id).subscribe(
      data => {
        const response = (data as any);
        const retorno = JSON.parse(response._body);
        this.filmeSelec = retorno
        this.navCtrl.push(FilmePage, { Filme: this.filmeSelec });
      }, error => {
        console.log("erro aqui:" + error);
      }
    )
  }

  configLista(){
    this.navCtrl.push(ConfiguracoesdalistaPage);
  }

}
