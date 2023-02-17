import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './admin/components/calendar/calendar.component';
import { ClientsComponent } from './admin/components/clients/clients.component';
import { DashboardComponent } from './admin/pages/dashboard/dashboard.component';
import { authGuard } from './shared/auth/auth.guard';
import { AccueilComponent } from './users/pages/accueil/accueil.component';
import { LoginComponent } from './users/pages/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        canActivateChild: [authGuard],
        children: [
          {
            path: 'calendrier',
            component: CalendarComponent,
          },
          {
            path: 'clients',
            component: ClientsComponent,
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
