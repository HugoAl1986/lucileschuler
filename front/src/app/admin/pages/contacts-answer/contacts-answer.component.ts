import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faDisplay } from '@fortawesome/free-solid-svg-icons';
import * as _ from 'lodash';
import { filter, map } from 'rxjs';
import { ContactMailResponse } from 'src/app/shared/interfaces/contact-mail-response.interface';
import { ContactMail } from 'src/app/shared/interfaces/contactMail.interface';
import { BehaviourService } from 'src/app/shared/services/behaviour.service';
import { ContactMailResponseService } from 'src/app/shared/services/contact-mail-response.service';

@Component({
  selector: 'app-contacts-answer',
  templateUrl: './contacts-answer.component.html',
  styleUrls: ['./contacts-answer.component.scss'],
})
export class ContactsAnswerComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private behaviourService: BehaviourService,
    private contactMailResponeService:ContactMailResponseService
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
      }
    );
  }

  onSubmit():void{
    this.contactMailResponeService.sendContactMailResponse(this.responseForm.value, this.contactMail.id).subscribe((data:ContactMailResponse) => {
      console.log(data)
    });
  }
  displayResponse():void{
    this.response = true
   }
}
