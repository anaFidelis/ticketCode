import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { provedorProvider } from '../../providers/provedor/provedor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ListasPage } from '../listas/listas';
import { ImagensPage } from '../imagens/imagens';


@IonicPage()
@Component({
  selector: 'page-configuracoesdalista',
  templateUrl: 'configuracoesdalista.html',
})
export class ConfiguracoesdalistaPage {

  form: FormGroup;
  id: number;
  imagem: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public provedor: provedorProvider,
    public toastCtrl: ToastController, private formBuilder: FormBuilder, public modalCtrl: ModalController) {
    this.form = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      descricao: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    });

    this.imagem = navParams.get("imagem");

    if (this.imagem == "") {
      this.imagem = "addimg.png";
    }
  }

  ionViewDidLoad() {
    console.log("viu");
  }
  salvar() {
    let lista = this.form.value;
    let toast = this.toastCtrl.create({ duration: 3000, position: 'buttom' });
    this.provedor.salvarLista(lista).subscribe(
      data => {
        this.navCtrl.setRoot(ListasPage);
        toast.setMessage("Lista Criada com sucesso...");
      }, error => {
        toast.setMessage(error._body);
      }
    );
    toast.present();
  }

  selecionarImagem() {
    const modal = this.modalCtrl.create(ImagensPage);
    modal.present();
  }
}
