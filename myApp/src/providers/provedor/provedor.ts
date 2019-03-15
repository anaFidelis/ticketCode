import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { usuario } from '../usuario';
import { lista } from '../lista';
import { filme } from '../filme';
import { Http, Headers } from "@angular/http";
import { Storage } from '@ionic/storage';

/*
  Generated class for the AutenticacaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class provedorProvider {


  private baseApi = "https://api.themoviedb.org/3/";
  private BasewebService = "/myfilme";
  private cabecalho = new Headers();
  private idUsuario: number;

  constructor(private http: Http, private storage: Storage) {
    this.cabecalho.append('Content-Type', 'application/json');
    this.loadUsuarioLogado();
  }

  loadUsuarioLogado() {
    this.storage.get("iduser").then((val) => {
      this.idUsuario = val;
    });
  }

  setUsuario(id: number){
    this.storage.set("iduser", id);
  }

  setLogout() {
    this.storage.set("iduser", 0);
  }

  //Usuario

  public criarUsuario(usuario: usuario) {
    return this.http.post(this.BasewebService + "/usuario/adicionar", JSON.stringify(usuario), { headers: this.cabecalho })
  }

  public logar(usuario: usuario) {
    return this.http.post(this.BasewebService + "/usuario/login", JSON.stringify(usuario), { headers: this.cabecalho })
  }

  public excluirconta(usuario: usuario) {
    return this.http.delete(this.BasewebService + "/usuario/excluir/" + this.idUsuario + "/" + usuario.senha);
  }

  public alterarUsuario(usuario: usuario) {
    usuario.idusuario = this.idUsuario;
    return this.http.put(this.BasewebService + "/usuario/atualizar", JSON.stringify(usuario), { headers: this.cabecalho })
  }

  public validaSenha(usuario: usuario) {
    usuario.idusuario = this.idUsuario;
    return this.http.post(this.BasewebService + "/usuario/validaSenha", JSON.stringify(usuario), { headers: this.cabecalho })
  }

  //Lista
  public BuscarListas() {
    return this.http.get(this.BasewebService + "/lista/listar/" + this.idUsuario);
  }

  public salvarLista(lista: lista) {
    lista.idusuario = this.idUsuario;
    return this.http.post(this.BasewebService + "/lista/adicionar", JSON.stringify(lista), { headers: this.cabecalho });

  }

  //Lista Filme

  public adicionarFilmeLista(filme: filme) {
    return this.http.post(this.BasewebService + "/filme/adicionar", JSON.stringify(filme), { headers: this.cabecalho });
  }

  public getFilmesLista(lista: lista) {
    return this.http.post(this.BasewebService + "/filme/buscar", JSON.stringify(lista), { headers: this.cabecalho });
  }



  //////////////api filmes

  public getUltimosFilmes() {
    return this.http.get(this.baseApi + "movie/popular?api_key=f840bdac2863c472d39227dacea93756&language=pt-BR");
  }

  public getFilme(idfilme: number) {
    console.log(this.baseApi + "movie/" + idfilme + "?api_key=f840bdac2863c472d39227dacea93756&language=pt-BR");
    return this.http.get(this.baseApi + "movie/" + idfilme + "?api_key=f840bdac2863c472d39227dacea93756&language=pt-BR");

  }








}
