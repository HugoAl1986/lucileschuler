import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core';
import { ModalWatchEventComponent } from '../modal-watch-event/modal-watch-event.component';

@Component({
  selector: 'app-modal-edit-event-calendar',
  templateUrl: './modal-edit-event-calendar.component.html',
  styleUrls: ['./modal-edit-event-calendar.component.scss']
})
export class ModalEditEventCalendarComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public datasEvent: EventClickArg, public dialog: MatDialog){
  }

  datasFromCalendar = {
    title : this.datasEvent.event.title,
    start : new Date(this.datasEvent.event.startStr),
    end : new Date(this.datasEvent.event.endStr),
    extendedDatas : this.datasEvent.event.extendedProps
  }

 ngOnInit(): void {
 }

 deleteEvent(): void{
  this.datasEvent.event.remove();
 }

 openWatchEventModal() : void {
  this.dialog.open(ModalWatchEventComponent,{
    data : this.datasFromCalendar
  })
    
  
 }

}
