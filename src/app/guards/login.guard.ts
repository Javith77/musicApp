import { NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private storage: Storage, private navController: NavController) {
    this.storage.create();
  }

  async canActivate() {
    const isLoggedIn = await this.storage.get('isLoggedIn');
    if (isLoggedIn) {
      return true;
    }
    this.navController.navigateForward('/login');
  }
}
