import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core';

@Component({
  selector: 'app-modal-edit-event-calendar',
  templateUrl: './modal-edit-event-calendar.component.html',
  styleUrls: ['./modal-edit-event-calendar.component.scss']
})
export class ModalEditEventCalendarComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public datasEvent: EventClickArg){
  }

  datasFromCalendar = {
    title : this.datasEvent.event.title,
    start : this.datasEvent.event.startStr,
    end : this.datasEvent.event.endStr,
    extendedDatas : this.datasEvent.event.extendedProps
  }

 ngOnInit(): void {
     console.log(this.datasFromCalendar);
 }

}
