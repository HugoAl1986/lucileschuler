import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Prix } from '../interfaces/prix.interface';
import { BehaviourService } from './behaviour.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class HttpPrixService {

  urlApi:string

  constructor(private http:HttpClient,private utils:UtilsService, private behaviourService:BehaviourService) {
    this.urlApi = this.utils.urlApi;
   }

  getPrix():Observable<any>{
    return this.http.get(this.urlApi + `admin/get_prix`).pipe(tap((prix:Prix[]) =>{
      this.behaviourService.prix.next(prix);
    }));
  }
}
