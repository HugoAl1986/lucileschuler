import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './admin/components/calendar/calendar.component';
import { ClientComponent } from './admin/pages/clients/client/client.component';
import { ClientsComponent } from './admin/pages/clients/clients.component';
import { CreateHorseComponent } from './admin/pages/horses/create-horse/create-horse.component';
import { CreateclientComponent } from './admin/pages/clients/createclient/createclient.component';
import { DashboardComponent } from './admin/pages/dashboard/dashboard.component';
import { HorseComponent } from './admin/pages/horses/horse.component';
import { authGuard } from './shared/auth/auth.guard';
import { AccueilComponent } from './users/pages/accueil/accueil.component';
import { LoginComponent } from './users/pages/login/login.component';
import { EditHorseComponent } from './admin/pages/horses/edit-horse/edit-horse.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: DashboardComponent,
    //canActivate: [authGuard],
    children: [
      {
        path: '',
        //canActivateChild: [authGuard],
        children: [
          {
            path: 'calendrier',
            component: CalendarComponent,
          },
          {
            path: 'clients',
            component: ClientsComponent,
          },
          {
            path: 'clients/createclient',
            component: CreateclientComponent,
          },
          {
            path: 'clients/:id',
            component: ClientComponent,
          },
          {
            path: 'horses',
            component: HorseComponent,
          },
          {
            path: 'horses/createhorse',
            component: CreateHorseComponent,
          },
          {
            path: 'horses/:id',
            component: EditHorseComponent,
          },
        ],
      },
    ],
  },
  {
    path: '',
    component: AccueilComponent,
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: AccueilComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
