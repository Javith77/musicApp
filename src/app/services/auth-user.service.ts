import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  constructor(private storage: Storage) { }

  async loginUser(credentials){
    const user: any = await this.storage.get('user');
    return new Promise((resolve, reject) => {
      if(user !== null && credentials.mail === user.mail
         && credentials.password === atob(user.password)){
        resolve('Authenticated user');
      }
      reject('Failed authentication!');
    });
  }

  registerUser(user){
    user.password = btoa(user.password);
    return new Promise((resolve, reject) => {
      if( this.storage.set('user', user)){
        resolve('User successfully saved');
      }
      reject('¡Failed saved!');
    });
  }
}
