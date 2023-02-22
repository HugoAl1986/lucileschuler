import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user.interface';
import { Client } from '../interfaces/client.interface';
import { Horse } from '../interfaces/horse.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = 'https://localhost:8000/api/';
  }

  clients = new BehaviorSubject<Array<Client>>([]);
  horses = new BehaviorSubject<Array<Horse>>([]);

  loggin(datas: User) {
    return this.http.post<string>(
      this.url + 'login_check',
      datas
    );
  }

  getClients():Observable<any>{
    return this.http.get(this.url + 'admin/clients');
  }

  getClient(id:string):Observable<any>{
    return this.http.get(this.url + `admin/get_client/${id}`)
  }

  updateClient(client:any, id:string){
    return this.http.put(this.url + `admin/update_client/${id}`,client)
  }

  createClient(client:any){
    return this.http.post(this.url + 'admin/create_client', client);
  }

  removeClient(id:string){
    return this.http.delete(this.url + `admin/remove_client/${id}`);
  }

  // Horses

  getHorses():Observable<any>{
    return this.http.get(this.url + "admin/get_horses");
  }

  createHorse(horse:any, id:string){
    return this.http.post(this.url + `admin/create_horse/${id}`, horse)
  }
}
