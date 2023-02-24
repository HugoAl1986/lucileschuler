import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';
import { UtilsService } from '../../utils.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private httpService: HttpService) {}

  ngOnInit(): void {
    forkJoin([
      this.httpService.getClients(),
      this.httpService.getHorses(),
    ]).subscribe(([dataClient, dataHorses]) => {
      this.router.navigate(['admin/calendrier']);
    });
  }
}
