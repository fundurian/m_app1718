import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {RegisterPage} from '../register/register';

@Component({
  templateUrl: 'login.html'
})
export class LoginPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openRegister(){
    console.log("hihi");      
    this.navCtrl.push(RegisterPage);
  }
}
