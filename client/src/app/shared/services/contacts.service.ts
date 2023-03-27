import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable, tap } from 'rxjs';
import { ContactMail } from '../interfaces/contactMail.interface';
import { BehaviourService } from './behaviour.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  urlApi: string;

  constructor(
    private httpClient: HttpClient,
    private utilsService: UtilsService,
    private behaviourService: BehaviourService
  ) {
    this.urlApi = this.utilsService.urlApi;
  }

  getContactsMail(): Observable<ContactMail[]> {
    return this.httpClient.get(this.urlApi + `admin/get_contacts_email`).pipe(
      tap((contactmails: ContactMail[]) => {
        this.behaviourService.contactsMail.next(contactmails);
      })
    );
  }

  setContactMailToRead(id_contact_mail: number): Observable<ContactMail> {
    return this.httpClient
      .get(this.urlApi + `admin/set_read_contact_mail/${id_contact_mail}`)
      .pipe(
        tap((contactMail: ContactMail) => {
          const arrayContactMail = this.behaviourService.contactsMail.value;
          _.map(arrayContactMail, (contact: ContactMail) => {
            if (contact.id == id_contact_mail) {
              contact.messageLu = true;
            }
          });
          this.behaviourService.contactsMail.next(arrayContactMail);
        })
      );
  }
}
