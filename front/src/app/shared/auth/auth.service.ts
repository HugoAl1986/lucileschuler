import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  token:string;

  isLogged() : boolean{
    return this.token ? true : false;
   }
}
