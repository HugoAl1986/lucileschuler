import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Horse } from 'src/app/shared/interfaces/horse.interface';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-horse',
  templateUrl: './horse.component.html',
  styleUrls: ['./horse.component.scss']
})
export class HorseComponent {

  constructor(private httpService:HttpService){

  }

  dataSource: MatTableDataSource<Horse> = new MatTableDataSource();
  displaySpinner: boolean = true;
  displayedColumns: string[] = ['nom', 'age', 'client', 'interventions', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    if (this.httpService.horses.getValue().length == 0) {
      this.httpService.getHorses().subscribe({
        next: (datas) => {
          this.dataSource.data = datas;
          this.httpService.horses.next(datas);
          this.displaySpinner = false;
        },
        error: (data: string) => console.log(data),
      });
    } else {
       this.httpService.horses.subscribe((data:Horse[]) => {
        this.dataSource.data = data;
        if (this.dataSource.data) {
          this.displaySpinner = false;
        }
      });
      
    }
  }

  openDialog(client: Horse) {
   /*  this.dialog.open(DialogDeleteClientComponent, {
      data: client
    }); */
  }
}


