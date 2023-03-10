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
          const interventionData = {
            id: intervention[0].id,
            title: intervention[0].title,
            start: intervention[0].start,
            end: intervention[0].end,
            nom: intervention[0].horse.client.nom,
            prenom: intervention[0].horse.client.prenom,
            cheval: intervention[0].horse.nom,
            report : intervention[0].report,
            adresseIntervention: {},
          };
          this.createAdresseIntervention(
            adresseIntervention,
            parseInt(intervention[0].id)
          ).forEach((adresseIntervention: AdresseIntervention) => {
            for (var data in adresseIntervention[0]) {
              if (data !== 'prestations') {
                interventionData['adresseIntervention'][data] =
                  adresseIntervention[0][data];
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
