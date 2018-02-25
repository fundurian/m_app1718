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
  loginCredential:{};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  loginCallback = (data) =>{
    return new Promise((resolve, reject) => {
      this.loginCredential = data;
      console.log('return from register',this.loginCredential);
      resolve();
    });
  }

  openRegister(){     
    this.navCtrl.push(RegisterPage,{
        callback: this.loginCallback
    });
  }
}
