import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventClickArg } from '@fullcalendar/core';
import { HttpInterventionService } from 'src/app/shared/services/http-intervention.service';
import { ModalWatchEventComponent } from '../modal-watch-event/modal-watch-event.component';

@Component({
  selector: 'app-modal-edit-event-calendar',
  templateUrl: './modal-edit-event-calendar.component.html',
  styleUrls: ['./modal-edit-event-calendar.component.scss'],
})
export class ModalEditEventCalendarComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public datasEvent: EventClickArg,
    public dialog: MatDialog,
    private interventionService: HttpInterventionService
  ) {
    console.log(this.datasEvent)
  }

  datasFromCalendar = {
    title: this.datasEvent.event.title,
    start: this.datasEvent.event.startStr,
    end: this.datasEvent.event.endStr,
    extendedDatas: this.datasEvent.event.extendedProps,
  };

  deleteEvent(): void {
    console.log(this.datasEvent.event.extendedProps);
    this.interventionService
      .deleteIntervention(parseInt(this.datasEvent.event.id))
      .subscribe((data: string) => {
        this.datasEvent.event.remove();
        console.log(data);
      });
  }

  openWatchEventModal(): void {
    this.dialog.open(ModalWatchEventComponent, {
      data: this.datasFromCalendar,
    });
  }
}
