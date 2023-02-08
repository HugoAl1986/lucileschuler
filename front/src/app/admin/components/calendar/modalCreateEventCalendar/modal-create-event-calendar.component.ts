import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateSelectArg } from '@fullcalendar/core';

@Component({
  selector: 'modal-create-event-calendar',
  templateUrl: './modal-create-event-calendar.component.html',
  styleUrls: ['./modal-create-event-calendar.component.scss'],
})
export class ModalCreateEventCalendar{
  clients: Array<Object> = [{
    nom: 'Schuler',
    prenom: 'Lucile',
    ecurie: 'Les écuries de Drumal',
    rue: 48,
    nomRue: 'rue du mesnil',
    codePostal: 60119,
    ville : "Henonville",
    cheval : "lenka"
  },
  {
    nom: 'Schuler',
    prenom: 'Roland',
    ecurie: 'Les écuries de Roland',
    rue: 25,
    nomRue: 'rue des veaux',
    codePostal: 95130,
    ville : "Franconville",
    cheval : "Tuno"
  }];

  selectedClient : Object = {};
  eventForm = new FormGroup({
    title: new FormControl('', Validators.required),
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required),
    nomClient: new FormControl('', Validators.required),
    cheval: new FormControl(this.clients[0]['cheval'], Validators.required),
  });

  format: number = 24;
 
  constructor(@Inject(MAT_DIALOG_DATA) public datasEvent: DateSelectArg) {
    console.log(this.clients[0]['cheval'])
  }

  onSubmit() {
    console.log(this.eventForm.value);
    const calendarApi = this.datasEvent.view.calendar;
    calendarApi.addEvent({
      title: this.eventForm.value.title,
      start:
        this.datasEvent.startStr + 'T' + this.eventForm.value.startTime + ':00',
      end:
        this.datasEvent.startStr + 'T' + this.eventForm.value.endTime + ':00',
      test: 'test',
    });
  }

  onSelected(i:number){
    this.selectedClient = this.clients[i];
  }

}
