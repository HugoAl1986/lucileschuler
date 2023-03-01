import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AdresseIntervention } from '../interfaces/adresse-intervention.interface';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  formatDate(date: Date) {
    const day = date.toLocaleDateString([], {timeZone:'Europe/Paris'});
    const hours = date.toLocaleTimeString(['fr-FR'], { timeStyle: 'short', timeZone:'Europe/Paris' });
    return {
      date: day,
      hours: hours,
    };
  }



  urlApi: string = 'https://localhost:8000/api/';
}
