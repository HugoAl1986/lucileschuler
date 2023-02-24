import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, tap } from 'rxjs';
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

  // Horses

  getHorses(): Observable<any> {
    return this.http
      .get(this.url + 'admin/get_horses')
      .pipe(tap((horses: Horse[]) => this.horses.next(horses)));
  }

  createHorse(horse: any, id: string) {
    return this.http.post(this.url + `admin/create_horse/${id}`, horse).pipe(
      tap((horse: Horse) => {
        const horses = this.horses.getValue();
        const clients = this.clients.getValue();
        const index = clients.findIndex((client: Client) => client.id == id);
        clients[index]['horses'].push(horse);
        horses.push(horse);
        this.horses.next(horses);
        this.clients.next(clients);
      })
    );
  }

  removeHorse(id: string) {
    return this.http.delete(this.url + `admin/remove_horse/${id}`).pipe(
      tap((data) => {
        const horses = this.horses.getValue();
        const index = horses.findIndex((horse: Horse) => horse.id == id);
        horses.splice(index, 1);
        this.horses.next(horses);

        //delete horse from Client

        const clients = this.clients.getValue();
        for (let i = 0; i < clients.length; i++) {
          const indexHorse = clients[i].horses.findIndex(
            (horse) => horse.id == id
          );
          console.log(indexHorse);
          if (indexHorse !== -1) {
            console.log('test');
            clients[i].horses.splice(indexHorse, 1);
          }
        }
        console.log(clients);
        this.clients.next(clients);
      })
    );
  }
  getHorse(id: string | number): Observable<any> {
    return this.http.get(this.url + `admin/get_horse/${id}`);
  }

  updateHorse(id: string | number, horseForm: FormGroup): Observable<any> {
    return this.http
      .put(this.url + `admin/update_horse/${id}`, horseForm.value)
      .pipe(
        tap((horse: Horse) => {
          const horses = this.horses.getValue();
          const indexHorse = horses.findIndex((horse: Horse) => horse.id == id);
          horses[indexHorse]['nom'] = horseForm.value.nom;
          horses[indexHorse]['age'] = horseForm.value.age;

          const clients = this.clients.getValue();
          const indexClient = clients.findIndex(
            (client: Client) => client.id == horseForm.value.idClient
          );
          const indexHorseFromClient = clients[indexClient]['horses'].findIndex(
            (horse: Horse) => horse.id == id
          );
          clients[indexClient]['horses'][indexHorseFromClient].nom =
            horseForm.value.nom;
          clients[indexClient]['horses'][indexHorseFromClient].age =
            horseForm.value.age;
          this.horses.next(horses);
          this.clients.next(clients);
        })
      );
  }
}
