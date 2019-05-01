import { Component, Provider } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { provedorProvider } from '../../providers/provedor/provedor';
import { TabsPage } from '../tabs/tabs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoginPage } from '../login/login';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the CriarContaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-criar-conta',
  templateUrl: 'criar-conta.html',
})
export class CriarContaPage {
  form: FormGroup;
  cpf_cnpj = '';
  DECIMAL_SEPARATOR = ".";
  GROUP_SEPARATOR = ",";
  pureResult: any;
  maskedId: any;
  val: any;
  v: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private autenticacao: provedorProvider,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private auth: AngularFireAuth) {
    this.form = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      login: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      //email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]

    });
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CriarContaPage');
  }
  criarConta() {
    let usuario = this.form.value;
    let toast = this.toastCtrl.create({ duration: 3000, position: 'buttom' });
    if (this.form.valid) {
      this.auth.auth.createUserWithEmailAndPassword(usuario.email, usuario.senha);
      /* this.autenticacao.criarUsuario(usuario).subscribe(
         data => {
           toast.setMessage("Usuario criado com sucesso.");
           this.autenticacao.logar(usuario).subscribe(
             data => {
               const response = (data as any);
               const retorno = JSON.parse(response._body);
               this.autenticacao.setUsuario(retorno.idusuario);
               this.navCtrl.setRoot(TabsPage);
 
             }, error => {
               toast.setMessage(error._body);
             })
           this.navCtrl.setRoot(TabsPage);
         }, error => {
           toast.setMessage(error._body);
         }*/
      // );

    } else {
      toast.setMessage("Campos invalidos");
    }
    toast.present();
  }

  showLoginPage() {
    this.navCtrl.push(LoginPage);
  }
}
