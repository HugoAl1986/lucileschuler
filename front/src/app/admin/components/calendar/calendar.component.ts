import { Component, ViewEncapsulation, ChangeDetectorRef, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { MatDialog } from '@angular/material/dialog';
import { ModalCreateEventCalendar } from './modalCreateEventCalendar/modal-create-event-calendar.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit {

  constructor(private changeDetector: ChangeDetectorRef, public dialog: MatDialog) {
  }


  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    locales: [ { code: 'fr' }],
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin 
    ],
    headerToolbar: {
      left: 'prev,next today',
      center:'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'
    },
    events :[
      {
        title : 'test2',
        start: '2023-02-04T10:30:00',
        end: '2023-02-04T16:30:00',
        description : "une petite description"
      }
    ],
    eventDidMount : (info) => {
      console.log(info.event.extendedProps);
    },
    initialView: 'dayGridMonth',
    eventDisplay : 'list-item',
    initialEvents: '',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    allDaySlot: false,
    slotMinTime:'07:00',
    slotMaxTime:'23:00',
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];

  
  ngOnInit(): void {
    this.calendarOptions;
  }

  openDialog(selectInfo:DateSelectArg) {
    this.dialog.open(ModalCreateEventCalendar,{
      width: '700px',
      data: selectInfo
    })
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.openDialog(selectInfo);
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
  }

  handleEventClick(clickInfo: EventClickArg) {
    console.log(clickInfo.event.extendedProps);
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }
}


