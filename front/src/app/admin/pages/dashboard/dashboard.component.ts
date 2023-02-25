import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/shared/services/http-client.service';
import { UtilsService } from '../../../shared/services/utils.service';
import { forkJoin } from 'rxjs';
import { HttpHorseService } from 'src/app/shared/services/http-horse.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private router: Router,
    private httpClientService: HttpClientService,
    private httpHorseService: HttpHorseService
  ) {}

  ngOnInit(): void {
    forkJoin([
      this.httpClientService.getClients(),
      this.httpHorseService.getHorses(),
    ]).subscribe(([dataClient, dataHorses]) => {
      this.router.navigate(['admin/calendrier']);
    });
  }
}
