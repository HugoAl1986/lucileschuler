import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Client } from '../interfaces/client.interface';
import { Horse } from '../interfaces/horse.interface';
import * as _ from 'lodash';
import { BehaviourService } from './behaviour.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class HttpHorseService {
  constructor(
    private http: HttpClient,
    private behaviourService: BehaviourService,
    private utils: UtilsService
  ) {
    this.horses = this.behaviourService.horses;
    this.clients = this.behaviourService.clients;
    this.url = this.utils.urlApi;
  }

  url: string;
  horses: BehaviorSubject<Horse[]>;
  clients: BehaviorSubject<Client[]>;

  getHorses(): Observable<any> {
    return this.http
      .get(this.url + 'admin/get_horses')
      .pipe(tap((horses: Horse[]) => this.horses.next(horses)));
  }

  createHorse(horse: any, idClient: string) {
    return this.http
      .post(this.url + `admin/create_horse/${idClient}`, horse)
      .pipe(
        tap((horse: Horse) => {
          const horses = this.horses.getValue();
          const clients = this.clients.getValue();
          const indexClient = _.findIndex(
            clients,
            (client: Client) => client.id == idClient
          );
          clients[indexClient].horses.push(horse);
          this.horses.next([...horses, horse]);
          this.clients.next(clients);
        })
      );
  }

  removeHorse(id: string) {
    return this.http.delete(this.url + `admin/remove_horse/${id}`).pipe(
      tap((data) => {
        const horses = this.horses.value;
        _.remove(horses, (horse: Horse) => {
          return horse.id == id;
        });
        this.horses.next(horses);

        // delete horse from Client

        const clients = this.clients.getValue();
        _.forEach(clients, (client: Client, index) => {
          _.remove(clients[index].horses, (horse: Horse) => {
            return horse.id == id;
          });
        });
        this.clients.next(clients);
      })
    );
  }
  getHorse(id: string | number): Observable<any> {
    return this.http.get(this.url + `admin/get_horse/${id}`);
  }

  updateHorse(id: string | number, horseFromForm: Horse): Observable<any> {
    return this.http
      .put(this.url + `admin/update_horse/${id}`, horseFromForm)
      .pipe(
        tap((horse: Horse) => {
          //update this.horses

          const horses = this.horses.getValue();
          const indexHorse = _.findIndex(
            horses,
            (horse: Horse) => horse.id == id
          );
          _.update(horses, `[${indexHorse}]`, (hors: Horse) => {
            return horseFromForm;
          });
          this.horses.next(horses);

          //update this.clients

          const clients = this.clients.getValue();
          const indexClient = _.findIndex(
            clients,
            (client: Client) => client.id == horseFromForm.client.id
          );
          const indexHorseFromClient = _.findIndex(
            clients[indexClient].horses,
            (horse: Horse) => horse.id == id
          );
          _.update(
            clients,
            `[${indexClient}].horses[${indexHorseFromClient}]`,
            (horse: Horse) => {
              return horseFromForm;
            }
          );
          this.clients.next(clients);
        })
      );
  }
}
