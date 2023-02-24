import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Client } from '../interfaces/client.interface';
import { Horse } from '../interfaces/horse.interface';

@Injectable({
  providedIn: 'root'
})
export class BehaviourService {

  constructor() { }

  horses = new BehaviorSubject<Array<Horse>>([]);
  clients = new BehaviorSubject<Array<Client>>([]);
}
