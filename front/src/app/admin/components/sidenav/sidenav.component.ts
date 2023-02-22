import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHorseHead } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { UtilsService } from '../../utils.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  faHorseHead = faHorseHead;
  changeColor: number[] = [0];
  activeLi: HTMLLIElement;
  bgColorOnClick: string = 'rgb(197,233,233)';
  bgColorOnMouseLeave: string = '#eee';
  colorOnClick: string = '#1b8d65';

  menu: Object[] = [
    { name: 'Calendrier', icon: 'calendar_month', path: 'calendrier' },
    { name: 'Contacts', icon: 'mail', path: 'contacts' },
    { name: 'Clients', icon: 'account_circle', path: 'clients' },
    { name: 'Chevaux', icon: faHorseHead, path: 'horses' },
    { name: 'Interventions', icon: 'business_center', path: 'interventions' },
    { name: 'Me deconnecter', icon: 'logout', path: '' },
  ];

  constructor(
    private utilsService: UtilsService,
    private authService: AuthService,
    private router: Router
  ) {}

  onMouseEnter(element: HTMLLIElement) {
    if (element.style.backgroundColor !== 'rgb(197, 233, 233)') {
      element.style.backgroundColor = '#eee';
    }
  }
  onMouseLeave(element: HTMLLIElement) {
    if (element.style.backgroundColor !== 'rgb(197, 233, 233)') {
      element.style.backgroundColor = 'inherit';
    }
  }

  onClick(i: number): void {
    this.changeColor.splice(0, 1, i);
    if (i == 4) {
      this.authService.removeLocalStorageToken();
      this.authService.removeLocalStorageToken();
      this.router.navigate(['/login']);
    }
  }
}
