import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ListasPage } from '../listas/listas';
import { ConfigContaPage } from '../config-conta/config-conta';
import { NavParams, NavController, App } from 'ionic-angular/umd';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  idusuario: number;
  
  tab1Root = ListasPage;
  tab2Root = HomePage;
  tab3Root = ConfigContaPage;

  constructor() {

  }
}
