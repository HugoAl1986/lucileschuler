import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Horse } from 'src/app/shared/interfaces/horse.interface';
import { HttpHorseService } from 'src/app/shared/services/http-horse.service';
import { DeleteHorseComponent } from '../../components/delete-horse/delete-horse.component';

@Component({
  selector: 'app-horse',
  templateUrl: './horse.component.html',
  styleUrls: ['./horse.component.scss'],
})
export class HorseComponent {
  constructor(
    private httpHorseService: HttpHorseService,
    private dialog: MatDialog
  ) {}

  dataSource: MatTableDataSource<Horse> = new MatTableDataSource();
  displaySpinner: boolean = true;
  displayedColumns: string[] = [
    'nom',
    'age',
    'client',
    'interventions',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.httpHorseService.horses.subscribe({
      next: (datas) => {
        this.dataSource.data = datas;
        this.displaySpinner = false;
      },
      error: (data: string) => console.log(data),
    });
  }

  openDialog(client: Horse) {
    this.dialog.open(DeleteHorseComponent, {
      data: client,
    });
  }
}
