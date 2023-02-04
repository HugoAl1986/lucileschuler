import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../utils.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayComponent:Object;

  constructor(private utilsService:UtilsService){}

  ngOnInit(): void {
      this.utilsService.displayComponent.subscribe((value) => {
        this.displayComponent = value;
        console.log(value)
      });
    
      console.log(this.displayComponent);
  }

}
