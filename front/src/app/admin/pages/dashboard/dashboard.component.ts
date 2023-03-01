import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/shared/services/http-client.service';
import { forkJoin } from 'rxjs';
import { HttpHorseService } from 'src/app/shared/services/http-horse.service';
import { HttpPrixService } from 'src/app/shared/services/http-prix.service';
import { HttpInterventionService } from 'src/app/shared/services/http-intervention.service';

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
    private httpInterventionService:HttpInterventionService
  ) {}

  ngOnInit(): void {
    forkJoin([
      this.httpClientService.getClients(),
      this.httpHorseService.getHorses(),
      this.httpPrixService.getPrix(),
      this.httpInterventionService.getPrestations()
    ]).subscribe((value) => {console.log(value);
      this.router.navigate(['admin/calendrier']);
    });
  }
}
