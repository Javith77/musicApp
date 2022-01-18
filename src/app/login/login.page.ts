import { AuthUserService } from './../services/auth-user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, AlertController  } from '@ionic/angular';

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
      private alertController: AlertController
    ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  submitForm(): any {
    this.isSubmitted = true;
    if (!this.loginForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      console.log(this.loginForm.value);
      this.goHome(this.loginForm.value);
    }
  }

  goHome(credentials): void{
    this.authUserService.loginUser(credentials)
    .then(resp => {
      console.log(resp);
      this.navController.navigateForward('/home');
    }).catch(error => this.showAlert(error));
  }

  async showAlert(message) {
    const alert = await this.alertController.create({
      header: 'Login',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
