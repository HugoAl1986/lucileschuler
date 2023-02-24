import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user.interface';
import { Client } from '../interfaces/client.interface';
import { Horse } from '../interfaces/horse.interface';
import * as _ from 'lodash';
import { BehaviourService } from './behaviour.service';
import { UtilsService } from '../utils.service';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {

  constructor(private http: HttpClient, private behaviourService:BehaviourService, private utilsService:UtilsService) {
    this.horses = this.behaviourService.horses;
    this.clients = this.behaviourService.clients;
    this.url = this.utilsService.urlApi;
  }

  horses:BehaviorSubject<Horse[]>;
  clients:BehaviorSubject<Client[]>;
  url:string;
  

  loggin(datas: User) {
    return this.http.post<string>(this.url + 'login_check', datas);
  }

  getClients(): Observable<any> {
    return this.http
      .get(this.url + 'admin/clients')
      .pipe(tap((clients: Client[]) => this.clients.next(clients)));
  }

  getClient(id: string): Observable<any> {
    return this.http.get(this.url + `admin/get_client/${id}`);
  }

  updateClient(client: any, idClient: string, clientForm: any) {
    return this.http
      .put(this.url + `admin/update_client/${idClient}`, client)
      .pipe(
        tap((client: Client) => {
          const clients = this.clients.getValue();
          const id = clients.findIndex(
            (client: Client) => client.id == idClient
          );
          if (id !== -1) {
            clients[id]['nom'] = clientForm.value.nom;
            clients[id]['prenom'] = clientForm.value.prenom;
            clients[id]['email'] = clientForm.value.email;
          }
          this.clients.next(clients);
        })
      );
  }

  createClient(client: any) {
    return this.http.post(this.url + 'admin/create_client', client).pipe(
      tap((client: Client) => {
        const clients = this.clients.getValue();
        clients.push(client);
        this.clients.next(clients);
      })
    );
  }

  removeClient(id: string | number) {
    return this.http.delete(this.url + `admin/remove_client/${id}`).pipe(
      tap((data) => {
        const clients = this.clients.getValue();
        const index = clients.findIndex((client: Client) => client.id == id);
        clients.splice(index, 1);
        this.clients.next(clients);
        const horses = this.horses.getValue();
        const indexHorse = horses.findIndex(
          (horse: Horse) => horse.client['id'] == id
        );
        horses.splice(indexHorse, 1);
        this.horses.next(horses);
      })
    );
  }

  
}
