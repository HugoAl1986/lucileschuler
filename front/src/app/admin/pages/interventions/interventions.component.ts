import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { map } from 'rxjs';
import { Intervention } from 'src/app/shared/interfaces/intervention.interface';
import { HttpInterventionService } from 'src/app/shared/services/http-intervention.service';
import { ModalDeleteInterventionComponent } from '../../components/modal-delete-intervention/modal-delete-intervention.component';

@Component({
  selector: 'app-interventions',
  templateUrl: './interventions.component.html',
  styleUrls: ['./interventions.component.scss'],
})
export class InterventionsComponent {
  constructor(
    private httpInterventionService: HttpInterventionService,
    private dialog: MatDialog
  ) {}

  dataSource: MatTableDataSource<Intervention> = new MatTableDataSource();
  displaySpinner: boolean = true;
  displayedColumns: string[] = [
    'title',
    'start',
    'end',
    'cheval',
    'nom', 
    'prenom',
    'adresseIntervention',
    //'rapport',
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
    this.httpInterventionService.interventions.subscribe({
      next: (datas) => {
        console.log(datas);
        this.dataSource.data = datas;
        this.displaySpinner = false;
      },
      error: (data: string) => console.log(data),
    });
  }

  openDialog(intervention: Intervention) {
     this.dialog.open(ModalDeleteInterventionComponent, {
      data: intervention,
    }); 
  }
}
