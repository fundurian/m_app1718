import { Component } from '@angular/core';
import { NavController, NavParams, ToastController  } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HTTP } from '@ionic-native/http';

export interface LoginResponse {
  status: any;
  status_message: string;
  data : string;
}

@Component({
  templateUrl: 'register.html'
})

export class RegisterPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  register: FormGroup;
  loginCallback:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public toastCtrl: ToastController,
    private formBuilder:FormBuilder,
    private httpClient: HttpClient,
    private http: HTTP) {
    this.register = this.formBuilder.group({
      username:['',[Validators.required, Validators.minLength(3)]],
      fname:['',Validators.required],
      lname:['',Validators.required],
      password:['',[Validators.required, Validators.minLength(6)]],
      cpassword:['',[Validators.required,Validators.minLength(6)]],
    });

    this.loginCallback = this.navParams.get("callback");
  }


  regsiterForm(){
    console.log(this.register.value);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/x-www-form-urlencoded'})
    };

    if(this.register.value.password != this.register.value.cpassword){
      this.createToast("Password mismatch").present();
      return;
    }

    var params = "fname="+this.register.value.fname+"&lname="+this.register.value.lname+
    "&uname="+this.register.value.username+"&upassword="+this.register.value.password;

    this.httpClient.post<LoginResponse>('http://www.fundurian.xyz/api/register.php',params,httpOptions).subscribe(
        data=>{
          console.log("login success",data);

          if(data.status == 200 && data.status_message == 'REGISTER SUCCESS'){
            window.localStorage.setItem('username',data.data);
            this.loginCallback({
              username : data.data,
              password : this.register.value.password
            }).then(()=>this.navCtrl.pop());
            return;
          }

          if(data.status == 200 && data.status_message == "REGISTER FAIL"){
            this.createToast("Registration failed").present();
            return;
          }

        },
        error =>{

          if(error.error.status_message == 'USER ALREADY EXISTS'){
            this.createToast("Registration failed. User already exists.").present();
          }else{
            this.createToast("Registration error").present();
          }
          
          console.log("login failed",error.error);
        }
      );
  }

  createToast(message){
    var option = {duration:3000,message:""};
    option.message = message;
    var toast = this.toastCtrl.create(option);
    return toast;
  }
}
