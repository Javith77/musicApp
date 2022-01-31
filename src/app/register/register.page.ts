import { PasswordValidator } from './../helpers/matching-passwords.validator';
import { AuthUserService } from './../services/auth-user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  isSubmitted = false;

  constructor(
    private navController: NavController,
    private alertController: AlertController,
    private storage: Storage,
    private authUserService: AuthUserService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fullname: [null, Validators.compose([Validators.required])],
      mail: [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
    });
  }

  submitForm(): any {
    this.isSubmitted = true;
    if (!this.registerForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    }

    this.authUserService.registerUser(this.registerForm.value)
    .then(resp => this.goLogin())
    .catch(error => this.showAlert(error));
  }

  goLogin() {
    this.navController.navigateBack('/login');
  }

  async showAlert(message) {
    const alert = await this.alertController.create({
      header: 'Registro',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
