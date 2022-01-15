import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class IntroGuard implements CanActivate {
  constructor(private storage: Storage, private router: Router) {
    this.storage.create();
  }
  async canActivate() {
    const intro = await this.storage.get('intro');
    if (intro) {
      return true;
    }
    this.router.navigateByUrl('/intro');
  }
}
