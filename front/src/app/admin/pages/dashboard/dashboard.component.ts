import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '../../utils.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  constructor(private router:Router){}

  ngOnInit(): void {
      this.router.navigate(["/admin/calendrier"]);
  }

}
