import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { Observable, tap } from 'rxjs';
import { Intervention } from '../interfaces/intervention.interface';
import { Report } from '../interfaces/report.interface';
import { BehaviourService } from './behaviour.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  apiUrl:string;

  constructor(private utilsService:UtilsService, private httpClient:HttpClient, private behaviourService:BehaviourService){
    this.apiUrl = this.utilsService.urlApi;
  }

  createReport(data:Partial<any>, id_intervention:number) : Observable<any>{
    return this.httpClient.post(this.apiUrl + `admin/create_report/${id_intervention}`,data).pipe(tap(
      (report:Report) => {       
        _.map(this.behaviourService.interventions.value, (intervention:Intervention) => {
        if(intervention.id = id_intervention){
          intervention.report = report;
        }
       })
      }
    ));
  }
}
