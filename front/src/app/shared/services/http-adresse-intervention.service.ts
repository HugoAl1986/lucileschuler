import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { mergeMap, Observable, of } from 'rxjs';
import { AdresseIntervention } from '../interfaces/adresse-intervention.interface';
import { Intervention } from '../interfaces/intervention.interface';
import { BehaviourService } from './behaviour.service';
import { HttpInterventionService } from './http-intervention.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class HttpAdresseInterventionService {
  urlApi: string;

  constructor(
    private http: HttpClient,
    private utils: UtilsService,
    private httpInterventionService: HttpInterventionService,
    private behaviourService: BehaviourService
  ) {
    this.urlApi = this.utils.urlApi;
  }

  createAdresseInterventionFromIntervention(
    intervention: Intervention,
    id_horse: number,
    id_prix: number,
    adresseIntervention: AdresseIntervention
  ) {
    return this.httpInterventionService
      .createIntervention(intervention, id_horse, id_prix)
      .pipe(
        mergeMap((intervention: Intervention) => {
          console.log
          const interventionData = {
            id: intervention.id,
            title: intervention.title,
            start: intervention.start,
            end: intervention.end,
            nom: intervention.horse.client.nom,
            prenom: intervention.horse.client.prenom,
            cheval: intervention.horse.nom,
            report : intervention.report,
            paid : intervention.paid,
            age_cheval : intervention.horse.age,
            adresseIntervention: {},
          };
          this.createAdresseIntervention(
            adresseIntervention,
            intervention.id
          ).forEach((adresseIntervention: AdresseIntervention) => {
            for (var data in adresseIntervention) {
              if (data !== 'prestations') {
                interventionData['adresseIntervention'][data] =
                  adresseIntervention[data];
              }
            }
            const newArray = [
              ...this.behaviourService.interventions.value,
              interventionData,
            ];
            this.behaviourService.interventions.next(newArray);
          });
          return of(interventionData);
        })
      );
  }
  createAdresseIntervention(
    intervention: AdresseIntervention,
    id_prestation: number
  ): Observable<any> {
    return this.http.post(
      this.urlApi + `admin/create_adresse_prestation/${id_prestation}`,
      intervention
    );
  }
}
