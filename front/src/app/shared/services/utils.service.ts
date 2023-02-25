import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  formatDate(date:Date){
    const day = date.toLocaleDateString();
    const hours = date.toLocaleTimeString([],{timeStyle: 'short'})
    return {
      date : day,
      hours : hours
    }
  } 

  urlApi:string = 'https://localhost:8000/api/';

}
