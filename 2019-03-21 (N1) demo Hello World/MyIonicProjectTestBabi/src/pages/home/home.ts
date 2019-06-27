import { Component } from '@angular/core';
import { NavController, ActionSheetController, LoadingController, ToastController } from 'ionic-angular';
import { provedorProvider } from '../../providers/provedor/provedor';
import { FilmePage } from '../filme/filme';
import { lista } from '../../providers/lista';
import { filme } from '../../providers/filme';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public lista_Videos = new Array<any>();
  public filmeSelec: any;

  constructor(public navCtrl: NavController,
    private provedor: provedorProvider,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {


  }

  ionViewDidLoad() {
    this.provedor.getUltimosFilmes().subscribe(
      data => {
        const response = (data as any);
        const retorno = JSON.parse(response._body);
        this.lista_Videos = retorno.results;
      }, error => {
        console.log(error);
      }
    )
  }


  teste() {
    console.log('Teste OK');
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

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Carregando Filme...",
      duration: 3000
    });
    loader.present();
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Selecione uma lista'
    });
    let toast = this.toastCtrl.create({ duration: 3000, position: 'buttom' })
    this.provedor.BuscarListas().subscribe(
      data => {
        const response = (data as any);
        const retorno = JSON.parse(response._body);
        let listasUsuario = (retorno as Array<lista>);
        for (let i = 0; i < listasUsuario.length; i++) {
          var button = {
            text: listasUsuario[i].nome + "",
            handler: () => {
              let filmeAdd = new filme;
              filmeAdd.codFilme = this.filmeSelec.id;
              filmeAdd.IDLista = listasUsuario[i].IDLista;
              this.provedor.adicionarFilmeLista(filmeAdd).subscribe(
                ret =>{
                  toast.setMessage("Adicionado com sucesso...");
                },err =>{
                  toast.setMessage(err._body);
                })

            }
          }
          actionSheet.addButton(button);
        }
        actionSheet.present();
      }, error => {
        console.log("erro aqui:" + error);
      }
    )
    toast.present();
  }

}
