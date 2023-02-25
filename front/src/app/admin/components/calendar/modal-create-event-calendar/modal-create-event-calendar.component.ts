import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateSelectArg } from '@fullcalendar/core';
import { MatSelectChange } from '@angular/material/select';
import { clients } from './datasClients.mock';
import { BehaviourService } from 'src/app/shared/services/behaviour.service';
import { map, tap } from 'rxjs';
import { Client } from 'src/app/shared/interfaces/client.interface';
import * as _ from 'lodash';

@Component({
  selector: 'modal-create-event-calendar',
  templateUrl: './modal-create-event-calendar.component.html',
  styleUrls: ['./modal-create-event-calendar.component.scss'],
})
export class ModalCreateEventCalendar implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public datasEvent: DateSelectArg,
    private fb: FormBuilder,
    private BehaviourServiceClient: BehaviourService
  ) {
    console.log(datasEvent);
  }

  clients: Array<Object>;
  selectedClient;
  choosenHorse: any;
  format: number = 24;
  public filteredClients;

  eventForm = this.fb.group({
    title: new FormControl('', Validators.required),
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required),
    nomClient: new FormControl('', Validators.required),
    ecurie: new FormControl('', Validators.required),
    rue: new FormControl('', Validators.required),
    nomRue: new FormControl('', Validators.required),
    codePostal: new FormControl('', Validators.required),
    ville: new FormControl('', Validators.required),
    otherFields: this.fb.array([
      new FormGroup({
        horse: new FormControl('', Validators.required),
      }),
    ]),
  });

  get otherFields(): FormArray {
    return this.eventForm.get('otherFields') as FormArray;
  }

  ngOnInit(): void {
    console.log(
      this.BehaviourServiceClient.clients
       .pipe(
          map((clients: Client[]) => {
            const newClients = [];
            _.forEach(clients, (client: Client) => {
              const data = {
                nom: client.nom,
                prenom: client.prenom,
                horses:client.horses
              };
              newClients.push(data);
            });
            return newClients;
          })
        ) 
        .subscribe((clients: Client[]) => {
          console.log(clients);
          this.clients = clients; 
          this.filteredClients = this.clients.slice();
        })
    );
  }

  onSubmit() {
    const calendarApi = this.datasEvent.view.calendar;
    console.log(this.eventForm.value);
    /* calendarApi.addEvent({
      title: this.eventForm.value.title,
      start:
        this.datasEvent.startStr + 'T' + this.eventForm.value.startTime + ':00',
      end:
        this.datasEvent.startStr + 'T' + this.eventForm.value.endTime + ':00',
      cheval: this.eventForm.value['otherFields'][0]['cheval'],
      ecurie: this.eventForm.value['otherFields'][0]['ecurie'],
      rue: this.eventForm.value['otherFields'][0]['rue'],
      nomRue: this.eventForm.value['otherFields'][0]['nomRue'],
      codePostal: this.eventForm.value['otherFields'][0]['codePostal'],
      ville: this.eventForm.value['otherFields'][0]['ville'],
      nom: this.eventForm.value['nomClient']['nom'],
      prenom: this.eventForm.value['nomClient']['prenom'],
    }); */
  }

  onSelected(event: MatSelectChange) {
    console.log(event.value['horses']);
    this.choosenHorse = event.value['horses'][0];
    this.selectedClient = {
      horses: event.value['horses'],
    };
    console.log(this.selectedClient);
    this.eventForm.controls['otherFields'].patchValue([
      {
        horse: this.choosenHorse,
      },
    ]);
  }

  onClickHorse(event: MatSelectChange) {
    this.choosenHorse = event.value;
    console.log(this.choosenHorse);
    this.eventForm.controls['otherFields'].patchValue([
      {
        horse: this.choosenHorse,
      },
    ]);
  }
}
