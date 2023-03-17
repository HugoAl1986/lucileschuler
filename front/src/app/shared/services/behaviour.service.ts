import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Client } from '../interfaces/client.interface';
import { ContactMailResponse } from '../interfaces/contact-mail-response.interface';
import { ContactMail } from '../interfaces/contactMail.interface';
import { Horse } from '../interfaces/horse.interface';
import { Intervention } from '../interfaces/intervention.interface';
import { Prix } from '../interfaces/prix.interface';

@Injectable({
  providedIn: 'root'
})
export class BehaviourService {

  constructor() { }

  horses = new BehaviorSubject<Array<Horse>>([]);
  clients = new BehaviorSubject<Array<Client>>([]);
  interventions = new BehaviorSubject<Array<Intervention>>([]);
  prix = new BehaviorSubject<Array<Prix>>([]);
  contactsMail = new BehaviorSubject<Array<ContactMail>>([]);
  contactMailResponse = new BehaviorSubject<Array<ContactMailResponse>>([]);
}
