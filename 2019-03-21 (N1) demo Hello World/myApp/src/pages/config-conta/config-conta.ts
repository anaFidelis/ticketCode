import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { provedorProvider } from '../../providers/provedor/provedor';
import { usuario } from '../../providers/usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the ConfigContaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-config-conta',
  templateUrl: 'config-conta.html',
})
export class ConfigContaPage {

  usuario = new usuario;
  form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appCtrl: App,
    public provider: provedorProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      login: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      confirmarSenha: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  ionViewDidLoad() {


  }


  alterarDados() {
    this.provider.loadUsuarioLogado();
    let toast = this.toastCtrl.create({ duration: 3000, position: 'buttom' });
    let user = this.form.value;
    if (this.form.value.senha != this.form.value.confirmarSenha) {
      toast.setMessage("Senhas não são iguais");
      toast.present();
    } else {
      if (this.form.valid) {
        const prompt = this.alertCtrl.create({
          title: 'Atualizar conta',
          message: "Digite sua senha para atualizar a conta.",
          inputs: [
            {
              name: 'SenhaAtual',
              placeholder: 'Senha',
              type: 'password'
            },
          ],
          buttons: [
            {
              text: 'Cancelar',
              handler: data => {
                toast.setMessage("Atualização cancelada");
                toast.present();
              }
            },
            {
              text: 'Atualizar',
              handler: data => {
                let userValidaSenha = this.form.value;
                userValidaSenha.senha = data.SenhaAtual;
                console.log(data.senha);
                this.provider.validaSenha(userValidaSenha).subscribe(
                  dat => {
                    user.senha = user.confirmarSenha;
                    this.provider.alterarUsuario(user).subscribe(
                      ok => {
                        toast.setMessage("Usuario atualizado com sucesso");
                        toast.present();
                        this.navCtrl.push(TabsPage);
                      }, erro => {
                        toast.setMessage(erro._body);
                        toast.present();
                      });
                  }, error => {
                    toast.setMessage(error._body);
                    toast.present();
                  });
              }
            }
          ]
        });
        prompt.present();
      } else {
        toast.setMessage("Campos inválidos");
      }
    }
  }


  logout() {
    this.provider.setLogout();
    this.navCtrl.goToRoot;
    this.appCtrl.getRootNav().setRoot(LoginPage);
  }


  excluirConta() {
    this.provider.loadUsuarioLogado();
    let toast = this.toastCtrl.create({ duration: 3000, position: 'buttom' });
    const prompt = this.alertCtrl.create({
      title: 'Excluir conta',
      message: "Digite sua senha para excluir sua conta.",
      inputs: [
        {
          name: 'Senha',
          placeholder: 'Senha',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Excluir',
          handler: data => {
            this.usuario.senha = data.Senha;
            this.provider.excluirconta(this.usuario).subscribe(
              dat => {
                toast.setMessage("Usuario excluido com sucesso");
                this.provider.setLogout();
                this.navCtrl.goToRoot;
                this.appCtrl.getRootNav().setRoot(LoginPage);
              }, err => {
                toast.setMessage(err._body);
              });
            toast.present();
          }
        }
      ]
    });
    prompt.present();
  }
}
