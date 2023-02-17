import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = 'https://localhost:8000/api/';
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  loggin(datas: User) {
    return this.http.post<string>(
      this.url + 'login_check',
      datas,
      this.httpOptions
    );
  }

  getClients():Observable<any>{
    return this.http.get(this.url + 'admin/clients')
  }
}
