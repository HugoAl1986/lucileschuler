import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { LoginComponent } from './pages/login/login.component';


const routes: Routes = [
 
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: AccueilComponent
  },
  {
    path:'admin/dashboard',
    loadChildren : () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  { path: '',  redirectTo: '', pathMatch: 'full' },
  { path: '**', component: AccueilComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
