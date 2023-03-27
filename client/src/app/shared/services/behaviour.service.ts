import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { BehaviorSubject, map, Observable, reduce, tap } from 'rxjs';
import { Client } from '../interfaces/client.interface';
import { ContactMailResponse } from '../interfaces/contact-mail-response.interface';
import { ContactMail } from '../interfaces/contactMail.interface';
import { Horse } from '../interfaces/horse.interface';
import { Intervention } from '../interfaces/intervention.interface';
import { Prix } from '../interfaces/prix.interface';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class BehaviourService {
  constructor(private utilsService: UtilsService) {}

  horses = new BehaviorSubject<Array<Horse>>([]);
  clients = new BehaviorSubject<Array<Client>>([]);
  interventions = new BehaviorSubject<Array<Intervention>>([]);
  prix = new BehaviorSubject<Array<Prix>>([]);
  contactsMail = new BehaviorSubject<Array<ContactMail>>([]);
  contactMailResponse = new BehaviorSubject<Array<ContactMailResponse>>([]);

  ObservableInterventionsToGetMonthTurnover:Observable<number> = this.interventions
    .asObservable()
    .pipe(
      map((val: Intervention[]) => {
        return _.sumBy(val, (intervention: Intervention) => {
          if (this.utilsService.checkIfDateIsInTheMonth(new Date(intervention.end))) 
          {
            return intervention.prix.montant;
          }
          return 0;
        });
      })
    );

  ObservableInterventionsToGetNotifReport:Observable<number> = this.interventions.asObservable().pipe(map(
    (interventions:Intervention[]) => {
      let somme = 0;
      return _.sumBy(interventions,(intervention:Intervention) =>{
        if(this.utilsService.checkIfNotifReport(intervention)){
          console.log(somme);
          return somme + 1;
        }
        return 0;
      })
    }
  ))

   ObservableContactMailToGetNotifReadMessage:Observable<number> =  this.contactsMail.asObservable().pipe(map(
    (contactMails:ContactMail[]) => {
      let somme = 0;
      return _.sumBy(contactMails, (contactMail:ContactMail) => {
        if(!contactMail.messageLu){
          return somme + 1
        }
        return 0;
      })
    }
  )) 

  ObservableContactMailToGetNumberMessageWeekInProgress:Observable<number> = this.contactsMail.asObservable().pipe(map(
    (contactMails:ContactMail[]) => {
      let somme = 0;
     return _.sumBy(contactMails,(contactMail:ContactMail) => {
       if(this.utilsService.checkIfMessageSentThisMonth(contactMail)){
        return somme + 1 ;
       }
       return 0;
      })
    }
  ))
}
