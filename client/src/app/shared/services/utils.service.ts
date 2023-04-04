import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { co } from '@fullcalendar/core/internal-common';
import * as _ from 'lodash';
import { BehaviorSubject, from, map, Observable, reduce } from 'rxjs';
import { AdresseIntervention } from '../interfaces/adresse-intervention.interface';
import { ContactMail } from '../interfaces/contactMail.interface';
import { Intervention } from '../interfaces/intervention.interface';
import { Report } from '../interfaces/report.interface';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  urlApi: string = 'https://test.lucileschuler.com/api/';
  urlReport: string = 'C:/Users/hugoa/Dev/shiatsu-lulu/back/assets/reports/';

  formatDate(date: Date) {
    const day = date.toLocaleDateString([], { timeZone: 'Europe/Paris' });
    const hours = date.toLocaleTimeString(['fr-FR'], {
      timeStyle: 'short',
      timeZone: 'Europe/Paris',
    });
    return {
      date: day,
      hours: hours,
    };
  }

  checkIfDateIsInTheMonth(date:Date) : boolean{
    const currentDate = new Date();
    if(currentDate.getFullYear() == date.getFullYear() && currentDate.getMonth() == date.getMonth()){
      return true
    }
    return false;
  }

  checkIfNotifReport(intervention:Intervention) : boolean{
    const dateNow = new Date();
    const dateInterventionEnd = new Date(intervention.end);
    const timeNotif2Days = 1000 * 3600 * 24 * 2;
    return dateInterventionEnd.getTime() + timeNotif2Days < dateNow.getTime() && !intervention.report ? true : false;
  }

  checkIfMessageSentThisMonth(contactMail:ContactMail) : boolean {
    const now = new Date();
    const dateMail = new Date(contactMail.date);
    if(now.getFullYear() == dateMail.getFullYear() && now.getMonth() == dateMail.getMonth()){
      return true;
    }
    return false
  }
}