import { Component, ViewEncapsulation, ChangeDetectorRef, OnInit, HostListener } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { createEventId } from './event-utils';
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
      timeGridPlugin,
      listPlugin  
    ],
    headerToolbar: {
      left: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    events :[
      {
        id:'1',
        title : 'test2',
        start: '2023-02-04T10:30:00',
        end: '2023-02-04T16:30:00'
      }
    ],
    initialView: 'dayGridMonth',
    eventDisplay : 'list-item',
    initialEvents: '',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
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
      data: selectInfo
    })
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    console.log(selectInfo);
    this.openDialog(selectInfo);
    const calendarApi = selectInfo.view.calendar;
    

    calendarApi.unselect(); // clear date selection
    /*
      calendarApi.addEvent({
        id: createEventId(),
        title:'test',
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    */
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }
}


