import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  constructor() { }

  loginUser(credentials){
    return new Promise((resolve, reject) => {
      if(credentials.username === 'over.meneses' && credentials.password === 'password'){
        resolve('User authenticated');
      }else{
        reject('User not authenticated');
      }
    });
  }
}
