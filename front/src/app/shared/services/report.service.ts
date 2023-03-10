import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  apiUrl:string;

  constructor(private utilsService:UtilsService, private httpClient:HttpClient){
    this.apiUrl = this.utilsService.urlApi;
  }

  createReport(data:Partial<any>) : Observable<any>{
    return this.httpClient.post(this.apiUrl + 'admin/create_report',data)
  }
}
