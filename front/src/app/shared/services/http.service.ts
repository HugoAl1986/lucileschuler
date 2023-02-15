import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/user.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url:string;
  token:string;

  constructor(private http:HttpClient) { 
    this.url = "https://localhost:8000/api/"
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  loggin(datas:User){
    return this.http.post<string>(this.url + 'login_check',datas, this.httpOptions)
  }

  isLogged() : boolean{
   return this.token ? true : false;
  }

}
