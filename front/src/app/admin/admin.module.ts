import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { StatsComponent } from './components/stats/stats.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ClientsComponent } from './components/clients/clients.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MaterialModule } from '../shared/material/material.module';
import { ModalCreateEventCalendar } from './components/calendar/modalCreateEventCalendar/modal-create-event-calendar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxMatTimepickerModule} from 'ngx-mat-timepicker'; 
import { MatSelectFilterModule } from 'mat-select-filter';
import { ModalEditEventCalendarComponent } from './components/calendar/modal-edit-event-calendar/modal-edit-event-calendar.component';






@NgModule({
  declarations: [
    DashboardComponent,
    StatsComponent,
    SidenavComponent,
    CalendarComponent,
    ClientsComponent,
    ModalCreateEventCalendar,
    ModalEditEventCalendarComponent
  
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FontAwesomeModule,
    FullCalendarModule,
    LayoutModule,
    MaterialModule, 
    FormsModule, 
    ReactiveFormsModule,
    NgxMatTimepickerModule.setLocale('fr-FR'),
    MatSelectFilterModule
  ]
})
export class AdminModule { }
