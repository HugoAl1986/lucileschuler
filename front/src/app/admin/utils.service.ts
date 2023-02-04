import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  displayComponent:BehaviorSubject<Object> = new BehaviorSubject({
    name:'Calendrier',
    display:true
  });

}
