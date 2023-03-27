import {
  Component,
  ViewEncapsulation,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { MatDialog } from '@angular/material/dialog';
import { ModalCreateEventCalendar } from '../../components/modal-create-event-calendar/modal-create-event-calendar.component';
import { ModalEditEventCalendarComponent } from '../../components/modal-edit-event-calendar/modal-edit-event-calendar.component';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { BehaviourService } from 'src/app/shared/services/behaviour.service';
import { Intervention } from 'src/app/shared/interfaces/intervention.interface';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit {
  constructor(
    private changeDetector: ChangeDetectorRef,
    public dialog: MatDialog,
    private authService: AuthService,
    private behaviourService: BehaviourService
  ) {}

  calendarOptions: any;
  datasEvent: Intervention[];
  currentEvents: EventApi[] = [];
  initCalendar(): void {
    this.calendarOptions = {
      locales: [{ code: 'fr', timeZone: 'Europe/Paris' }],
      // timeZone: 'UTC',
      plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay',
      },
      buttonText: {
        day: "Aujourd'hui",
        month: 'Mois',
        week: 'Semaine',
      },
      events: this.datasEvent,
      initialView: 'dayGridMonth',
      eventDisplay: 'list-item',
      initialEvents: '',
      weekends: true,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      allDaySlot: false,
      slotMinTime: '07:00',
      slotMaxTime: '23:00',
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.handleEvents.bind(this),
    };
  }

  ngOnInit(): void {
    this.behaviourService.interventions.subscribe(
      (interventions: Intervention[]) => {
        console.log(interventions);
        this.datasEvent = interventions;
        this.initCalendar();
      }
    );
  }

  openDialogCreateEvent(selectInfo: DateSelectArg) {
    this.dialog.open(ModalCreateEventCalendar, {
      width: '700px',
      data: selectInfo,
    });
  }

  openDialogEditEvent(clickInfo: EventClickArg) {
    this.dialog.open(ModalEditEventCalendarComponent, {
      width: '400px',
      data: clickInfo,
    });
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.openDialogCreateEvent(selectInfo);
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
  }

  handleEventClick(clickInfo: EventClickArg) {
    console.log(clickInfo);
    this.openDialogEditEvent(clickInfo);
    // clickInfo.event.remove();
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }
}
