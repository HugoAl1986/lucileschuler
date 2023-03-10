import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateSelectArg } from '@fullcalendar/core';
import { MatSelectChange } from '@angular/material/select';
import { BehaviourService } from 'src/app/shared/services/behaviour.service';
import { map, Subscription } from 'rxjs';
import { Client } from 'src/app/shared/interfaces/client.interface';
import * as _ from 'lodash';
import { Prix } from 'src/app/shared/interfaces/prix.interface';
import { HttpAdresseInterventionService } from 'src/app/shared/services/http-adresse-intervention.service';

@Component({
  selector: 'modal-create-event-calendar',
  templateUrl: './modal-create-event-calendar.component.html',
  styleUrls: ['./modal-create-event-calendar.component.scss'],
})
export class ModalCreateEventCalendar implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public datasEvent: DateSelectArg,
    private behaviourService: BehaviourService,
    private httpAdresseInterventionService: HttpAdresseInterventionService
  ) {}
  clients: Array<Object>;
  selectedClient: any;
  choosenHorse: any;
  format: number = 24;
  closeDialog: boolean = false;
  prix: Array<Prix>;
  selectedPrix: any;
  filteredClients: Object[];

  eventForm = new FormGroup({
    intervention: new FormGroup({
      title: new FormControl('', Validators.required),
      start: new FormControl('', Validators.required),
      end: new FormControl('', Validators.required),
    }),
    nomClient: new FormControl('', Validators.required),
    prix: new FormControl('', Validators.required),
    adresseIntervention: new FormGroup({
      nom_ecurie: new FormControl('', Validators.required),
      numero_rue: new FormControl('', Validators.required),
      rue: new FormControl('', Validators.required),
      code_postal: new FormControl('', Validators.required),
      ville: new FormControl('', Validators.required),
    }),
    otherFields: new FormArray([
      new FormGroup({
        horse: new FormControl('', Validators.required),
      }),
    ]),
  });

  get otherFields(): FormArray {
    return this.eventForm.get('otherFields') as FormArray;
  }

  ngOnInit(): void {
    this.prix = this.behaviourService.prix.value;
    this.selectedPrix = this.prix[1];
    this.eventForm.patchValue({
      prix: this.selectedPrix,
    });
    this.behaviourService.clients
      .pipe(
        map((clients: Client[]) => {
          const newClients = [];
          _.forEach(clients, (client: Client) => {
            const data = {
              nom: client.nom,
              prenom: client.prenom,
              horses: client.horses,
            };
            newClients.push(data);
          });
          return newClients;
        })
      )
      .subscribe((clients: Client[]) => {
        this.clients = clients;
        this.filteredClients = this.clients.slice();
      });
  }

  onSubmit() {
    const calendarApi = this.datasEvent.view.calendar;

    this.eventForm.value.intervention.start =
      this.datasEvent.startStr +
      'T' +
      this.eventForm.value.intervention.start +
      ':00+01:00';
    this.eventForm.value.intervention.end =
      this.datasEvent.startStr +
      'T' +
      this.eventForm.value.intervention.end +
      ':00+01:00';

    this.httpAdresseInterventionService
      .createAdresseInterventionFromIntervention(
        this.eventForm.value.intervention,
        this.eventForm.value.otherFields[0].horse['id'],
        this.eventForm.value.prix['id'],
        this.eventForm.value.adresseIntervention
      )
      .subscribe(
        (data) => {
          this.datasEvent.view.calendar.addEvent(data);
          this.closeDialog = true;
        }
      );
  }

  onSelected(event: MatSelectChange) {
    this.choosenHorse = event.value['horses'][0];
    this.selectedClient = {
      horses: event.value['horses'],
    };
    this.eventForm.controls['otherFields'].patchValue([
      {
        horse: this.choosenHorse,
      },
    ]);
  }

  onClickHorse(event: MatSelectChange) {
    this.choosenHorse = event.value;
    this.eventForm.controls['otherFields'].patchValue([
      {
        horse: this.choosenHorse,
      },
    ]);
  }
}
