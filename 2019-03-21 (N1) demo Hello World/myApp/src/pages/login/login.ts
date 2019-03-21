import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CriarContaPage } from '../criar-conta/criar-conta';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { ConfiguracoesdalistaPage } from '../configuracoesdalista/configuracoesdalista';
import { ListasPage } from '../listas/listas';
import { provedorProvider } from '../../providers/provedor/provedor';
import { usuario } from '../../providers/usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  usuario: usuario;
  form: FormGroup;
 
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private provedor: provedorProvider,
    private formBuilder: FormBuilder,
    private storage: Storage) {
    this.form = this.formBuilder.group({
      login: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      senha: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]

    });
  }

  ionViewDidLoad() {
  }



  logar() {
    let toast = this.toastCtrl.create({ duration: 3000, position: 'buttom' });
    if (this.form.valid) {
      this.usuario = this.form.value;
      this.usuario.email = this.usuario.login;
      this.provedor.logar(this.usuario).subscribe(
        data => {
          const response = (data as any);
          const retorno = JSON.parse(response._body);
          this.provedor.setUsuario(retorno.idusuario);
          this.navCtrl.setRoot(TabsPage);
        }, error => {
          toast.setMessage(error._body);
        }
      );
    } else {
      toast.setMessage("Campos inválidos");
    }
    toast.present();
  }


  showCriarConta() {
    this.navCtrl.setRoot(CriarContaPage);
  }



}
