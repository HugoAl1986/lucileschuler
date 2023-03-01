import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Intervention } from '../interfaces/intervention.interface';
import { UtilsService } from './utils.service';
import * as _ from 'lodash';
import { BehaviourService } from './behaviour.service';

@Injectable({
  providedIn: 'root',
})
export class HttpInterventionService {
  urlApi: string;

  constructor(
    private http: HttpClient,
    private utils: UtilsService,
    private behaviourService: BehaviourService
  ) {
    this.urlApi = this.utils.urlApi;
  }

  createIntervention(
    intervention: Intervention,
    id_horse: number,
    id_prix
  ): Observable<Intervention> {
    return this.http.post(
      this.urlApi + `admin/create_prestation/${id_horse}/${id_prix}`,
      intervention
    );
  }

  getPrestations(): Observable<Intervention[]> {
    return this.http.get(this.urlApi + `admin/prestations`).pipe(
      map((interventions: any) => {
        const newInterventionArray = [];
        _.forEach(interventions[0], (data: Intervention) => {
          const interventionData = {
            idIntervention: data.id,
            title: data.title,
            start: data.start,
            end: data.end,
            nom: data.horse.client.nom,
            prenom: data.horse.client.prenom,
            cheval: data.horse.nom,
            adresseIntervention: data.adressePrestation,
          };
          newInterventionArray.push(interventionData);
        });
        this.behaviourService.interventions.next(newInterventionArray);
        return newInterventionArray;
      })
    );
  }

  deleteIntervention(id_prestation:number):Observable<any>{
    return this.http.delete(this.urlApi + `admin/remove_prestation/${id_prestation}`).pipe(
      tap(() => {
        const interventions = this.behaviourService.interventions.value;
        _.remove(interventions, (intervention:Intervention) => {
          intervention.id == id_prestation;
        })
      })
    )
  }
}