import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/shared/services/http-client.service';
import { forkJoin } from 'rxjs';
import { HttpHorseService } from 'src/app/shared/services/http-horse.service';
import { HttpPrixService } from 'src/app/shared/services/http-prix.service';
import { HttpInterventionService } from 'src/app/shared/services/http-intervention.service';
import { ContactsComponent } from '../contacts/contacts.component';
import { ContactsService } from 'src/app/shared/services/contacts.service';
import { ContactMailResponseService } from 'src/app/shared/services/contact-mail-response.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private router: Router,
    private httpClientService: HttpClientService,
    private httpHorseService: HttpHorseService,
    private httpPrixService:HttpPrixService,
    private httpInterventionService:HttpInterventionService,
    private contactsService:ContactsService,
    private contactMailResponseService:ContactMailResponseService
  ) {}

  ngOnInit(): void {
    forkJoin([
      this.httpClientService.getClients(),
      this.httpHorseService.getHorses(),
      this.httpPrixService.getPrix(),
      this.httpInterventionService.getPrestations(),
      this.contactsService.getContactsMail(),
      this.contactMailResponseService.getContactMailResponse()
    ]).subscribe((value) => {console.log(value);
      this.router.navigate(['admin/calendrier']);
    });
  }
}
