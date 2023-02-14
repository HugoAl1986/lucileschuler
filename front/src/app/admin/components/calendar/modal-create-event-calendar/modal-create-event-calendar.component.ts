import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateSelectArg } from '@fullcalendar/core';
import { MatSelectChange } from '@angular/material/select';
import { clients } from './datasClients.mock';

@Component({
  selector: 'modal-create-event-calendar',
  templateUrl: './modal-create-event-calendar.component.html',
  styleUrls: ['./modal-create-event-calendar.component.scss'],
})
export class ModalCreateEventCalendar {
  clients: Array<Object> = clients;
  selectedClient;
  choosenCheval: any;

  eventForm = this.fb.group({
    title: new FormControl('', Validators.required),
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required),
    nomClient: new FormControl('', Validators.required),
    otherFields: this.fb.array([
      new FormGroup({
        cheval: new FormControl('', Validators.required),
        ecurie: new FormControl('', Validators.required),
        rue: new FormControl('', Validators.required),
        nomRue: new FormControl('', Validators.required),
        codePostal: new FormControl('', Validators.required),
        ville: new FormControl('', Validators.required),
      }),
    ]),
  });

  format: number = 24;
  public filteredClients = this.clients.slice();

  constructor(
    @Inject(MAT_DIALOG_DATA) public datasEvent: DateSelectArg,
    private fb: FormBuilder
  ) {}

  get otherFields(): FormArray {
    return this.eventForm.get('otherFields') as FormArray;
  }

  onSubmit() {
    const calendarApi = this.datasEvent.view.calendar;
    calendarApi.addEvent({
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
      nom : this.eventForm.value['nomClient']['nom'],
      prenom : this.eventForm.value['nomClient']['prenom'],
    });
  }

  onSelected(event: MatSelectChange) {
    this.choosenCheval = event.value['cheval'][0];
    this.selectedClient = {
      ecurie: event.value['ecurie'],
      rue: event.value['rue'],
      nomRue: event.value['nomRue'],
      codePostal: event.value['codePostal'],
      ville: event.value['ville'],
      cheval: event.value['cheval']
    };
    this.eventForm.controls['otherFields'].setValue([this.selectedClient]);
    this.eventForm.controls['otherFields'].patchValue([
      {
        cheval: this.choosenCheval,
      },
    ]);
  }

  onClickCheval(event: MatSelectChange) {
    this.choosenCheval = event.value;
    this.eventForm.controls['otherFields'].patchValue([
      {
        cheval: this.choosenCheval,
      },
    ]);
  }
}
