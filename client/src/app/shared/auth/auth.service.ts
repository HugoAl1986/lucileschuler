import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isLogged(): boolean {
    console.log(this.getLocalStorageToken());
    return this.getLocalStorageToken() ? true : false;
  }

  setLocalStorageToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getLocalStorageToken(): string {
    return localStorage.getItem('token');
  }

  removeLocalStorageToken(): void {
    localStorage.removeItem('token');
  }
}
