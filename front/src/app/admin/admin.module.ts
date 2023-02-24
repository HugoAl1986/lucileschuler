import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { StatsComponent } from './components/stats/stats.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MaterialModule } from '../shared/material/material.module';
import { ModalCreateEventCalendar } from './components/calendar/modal-create-event-calendar/modal-create-event-calendar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MatSelectFilterModule } from 'mat-select-filter';
import { ModalEditEventCalendarComponent } from './components/calendar/modal-edit-event-calendar/modal-edit-event-calendar.component';
import { ModalWatchEventComponent } from './components/calendar/modal-watch-event/modal-watch-event.component';
import { AppRoutingModule } from '../app-routing.module';
import { ClientComponent } from './pages/clients/client/client.component';
import { CreateclientComponent } from './pages/clients/createclient/createclient.component';
import { DialogDeleteClientComponent } from './pages/clients/dialog-delete-client/dialog-delete-client.component';
import { HorseComponent } from './pages/horses/horse.component';
import { CreateHorseComponent } from './pages/horses/create-horse/create-horse.component';
import { DeleteHorseComponent } from './pages/horses/delete-horse/delete-horse.component';
import { EditHorseComponent } from './pages/horses/edit-horse/edit-horse.component';

@NgModule({
  declarations: [
    DashboardComponent,
    StatsComponent,
    SidenavComponent,
    CalendarComponent,
    ClientsComponent,
    ModalCreateEventCalendar,
    ModalEditEventCalendarComponent,
    ModalWatchEventComponent,
    ClientComponent,
    CreateclientComponent,
    DialogDeleteClientComponent,
    HorseComponent,
    CreateHorseComponent,
    DeleteHorseComponent,
    EditHorseComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FullCalendarModule,
    LayoutModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatTimepickerModule.setLocale('fr-FR'),
    MatSelectFilterModule,
  ],
})
export class AdminModule {}
