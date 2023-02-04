import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateSelectArg } from '@fullcalendar/core';

@Component({
  selector: 'modal-create-event-calendar',
  templateUrl: './modal-create-event-calendar.component.html',
  styleUrls: ['./modal-create-event-calendar.component.scss']
})
export class ModalCreateEventCalendar {

  titre : string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data:DateSelectArg){
    console.log(data);

  }

  onClick(data:string){
    console.log(data);
    const calendarApi = this.data.view.calendar;
    calendarApi.addEvent({
      id: "1",
      title:data,
      start: this.data.startStr,
      end: this.data.endStr,
      allDay: this.data.allDay
    });
  }

}
