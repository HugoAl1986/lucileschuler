import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable, tap } from 'rxjs';
import { ContactMailResponse } from '../interfaces/contact-mail-response.interface';
import { ContactMail } from '../interfaces/contactMail.interface';
import { BehaviourService } from './behaviour.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ContactMailResponseService {

  urlApi:string;

  constructor(private httpClient: HttpClient, private utilsService:UtilsService, private behaviourService:BehaviourService) {
    this.urlApi = this.utilsService.urlApi;
   }

   getContactMailResponse():Observable<ContactMailResponse[]>{
    return this.httpClient.get(this.urlApi + 'admin/get_contact_mail_response').pipe(tap(
      (contactMailResponse:ContactMailResponse[]) => {
        this.behaviourService.contactMailResponse.next(contactMailResponse);
      }
    ));
   }

   sendContactMailResponse(contactMailResponse:ContactMailResponse, id_contact_mail:number):Observable<ContactMailResponse>{
    return this.httpClient.post(this.urlApi + `admin/contact_mail_response/${id_contact_mail}`, contactMailResponse).pipe(tap(
      (contactMailResponse:ContactMailResponse) => {
        const contactMailDatas = this.behaviourService.contactsMail.value;
       _.map(contactMailDatas,(contactMail:ContactMail) => {
          if(contactMail.id == id_contact_mail){
            contactMail.messageLu = true;
          }
        })
        this.behaviourService.contactsMail.next(contactMailDatas);
        const contactMailResponseDatas = this.behaviourService.contactMailResponse.value;
        this.behaviourService.contactMailResponse.next([...contactMailResponseDatas,contactMailResponse])
      }
    ))
   }
}
