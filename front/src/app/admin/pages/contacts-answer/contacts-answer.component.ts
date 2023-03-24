import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';
import { ContactMailResponse } from 'src/app/shared/interfaces/contact-mail-response.interface';
import { ContactMail } from 'src/app/shared/interfaces/contactMail.interface';
import { BehaviourService } from 'src/app/shared/services/behaviour.service';
import { ContactMailResponseService } from 'src/app/shared/services/contact-mail-response.service';
import { ContactsService } from 'src/app/shared/services/contacts.service';

@Component({
  selector: 'app-contacts-answer',
  templateUrl: './contacts-answer.component.html',
  styleUrls: ['./contacts-answer.component.scss'],
})
export class ContactsAnswerComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private behaviourService: BehaviourService,
    private contactMailResponeService:ContactMailResponseService,
    private contactMailService:ContactsService,
    private router:Router
  ) {}

  contactMail: ContactMail;
  responseForm = new FormGroup({
    response: new FormControl('', Validators.required)
  });

  response: boolean;

  ngOnInit(): void {
    this.behaviourService.contactsMail.subscribe(
      (contactsMail: ContactMail[]) => {
        this.contactMail = _.find(contactsMail, (contactMail: ContactMail) => {       
          return contactMail.id == this.activatedRoute.snapshot.params['id'];
        });
        this.response = false;
        console.log(this.contactMail);
      }
    );
  }

  onSubmit():void{
    this.contactMailResponeService.sendContactMailResponse(this.responseForm.value, this.contactMail.id).subscribe((data:ContactMailResponse) => {
      this.router.navigate(['admin/contacts']);
    });
  }
  displayResponse(data:boolean):void{
    this.response = data;
   }

   setReadToContactMail(): void{
    this.contactMailService.setContactMailToRead(this.contactMail.id).subscribe((data:ContactMail )=> {
      this.router.navigate(['admin/contacts']);
    });
   }
}
