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
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'modal-create-event-calendar',
  templateUrl: './modal-create-event-calendar.component.html',
  styleUrls: ['./modal-create-event-calendar.component.scss'],
})
export class ModalCreateEventCalendar implements OnInit {
  clients: Array<Object> = [
    {
      nom: 'Schuler',
      prenom: 'Lucile',
      ecurie: 'Les écuries de Drumal',
      rue: 48,
      nomRue: 'rue du mesnil',
      codePostal: 60119,
      ville: 'Henonville',
      cheval: ['lenka', 'polux'],
    },
    {
      nom: 'Schuler',
      prenom: 'Roland',
      ecurie: 'Les écuries de Roland',
      rue: 25,
      nomRue: 'rue des veaux',
      codePostal: 95130,
      ville: 'Franconville',
      cheval: ['Tuno'],
    },
  ];

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public datasEvent: DateSelectArg,
    private fb: FormBuilder
  ) {}

  get otherFields(): FormArray {
    return this.eventForm.get('otherFields') as FormArray;
  }

  onSubmit() {
    console.log(this.eventForm.controls['otherFields'].value);
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

  onSelected(event: MatSelectChange) {
    this.choosenCheval = event.value['cheval'][0];
    this.selectedClient = {
      ecurie: event.value['ecurie'],
      rue: event.value['rue'],
      nomRue: event.value['nomRue'],
      codePostal: event.value['codePostal'],
      ville: event.value['ville'],
      cheval: event.value['cheval'],
    };
    this.eventForm.controls['otherFields'].setValue([this.selectedClient]);
    this.eventForm.controls['otherFields'].patchValue([
      {
        cheval: this.choosenCheval,
      },
    ]);
    console.log(this.selectedClient)
  }

  ngOnInit(): void {
    console.log(this.otherFields.controls[0]['value']);
  }
  onClick(event: MatSelectChange) {
    console.log(event);
    this.choosenCheval = event.value;
    this.eventForm.controls['otherFields'].patchValue([
      {
        cheval: this.choosenCheval,
      },
    ]);
  }
}
