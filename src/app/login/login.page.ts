import { AuthUserService } from './../services/auth-user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, AlertController  } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;
  constructor(
      private authUserService: AuthUserService,
      private formBuilder: FormBuilder,
      private navController: NavController,
      private alertController: AlertController,
      private storage: Storage,
    ) {
      this.storage.create();
    }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      mail: [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
    });
  }

  submitForm(): any {
    this.isSubmitted = true;
    if (!this.loginForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    }

    console.log(this.loginForm.value);
    this.authUserService.loginUser(this.loginForm.value)
    .then(resp => {
      console.log(resp);
      this.storage.set('isLoggedIn', true);
      this.navController.navigateForward('/sidebar/home');
    }).catch(error => this.showAlert(error));
  }

  goRegister(){
    this.navController.navigateForward('/register');
  }

  async showAlert(message) {
    const alert = await this.alertController.create({
      header: 'Inicio sesión',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
