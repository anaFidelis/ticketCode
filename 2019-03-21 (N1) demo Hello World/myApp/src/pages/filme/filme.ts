import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController } from 'ionic-angular';
import { provedorProvider } from '../../providers/provedor/provedor';
import { filme } from '../../providers/filme';
import { lista } from '../../providers/lista';

/**
 * Generated class for the FilmePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filme',
  templateUrl: 'filme.html',
})
export class FilmePage {

  idfilme: number; 
  Filme: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private provedor: provedorProvider,
    private actionSheetCtrl: ActionSheetController,
    private toastCtrl: ToastController) {

    let F = navParams.get('Filme');
    this.Filme = F;
    
  }

  ionViewDidLoad() {
  }

  salvarFilmeLista(){
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Selecione uma lista'
    });
    this.provedor.BuscarListas().subscribe(
      data => {
        const response = (data as any);
        const retorno = JSON.parse(response._body);
        let listasUsuario = (retorno as Array<lista>);
        for (let i = 0; i < listasUsuario.length; i++) {
          var button = {
            text: listasUsuario[i].nome + "",
            handler: () => {
              let listaFilme: filme;
              listaFilme.codFilme = this.idfilme;
              listaFilme.status = 0;
              listaFilme.IDLista = listasUsuario[i].IDLista;
              this.provedor.adicionarFilmeLista(listaFilme);
            }
          }
          actionSheet.addButton(button);
        }
        actionSheet.present();
      }, error => {
        console.log("erro aqui:" + error);
      }
    )
  }


  presentActionSheet(){

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
              filmeAdd.codFilme = this.Filme.id;
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
