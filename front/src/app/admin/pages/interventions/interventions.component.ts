import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { Intervention } from 'src/app/shared/interfaces/intervention.interface';
import { HttpInterventionService } from 'src/app/shared/services/http-intervention.service';
import { ModalDeleteInterventionComponent } from '../../components/modal-delete-intervention/modal-delete-intervention.component';
import { ModalSendReportComponent } from '../../components/modal-send-report/modal-send-report.component';


@Component({
  selector: 'app-interventions',
  templateUrl: './interventions.component.html',
  styleUrls: ['./interventions.component.scss'],
})
export class InterventionsComponent {
  constructor(
    private httpInterventionService: HttpInterventionService,
    private dialog: MatDialog

  ) {
   
  }

  dataSource: MatTableDataSource<Intervention> = new MatTableDataSource();
  displaySpinner: boolean = true;
  date:Date;
  dateIntervention:Date;
  displayedColumns: string[] = [
    'title',
    'start',
    'heure',
    'cheval',
    'nom', 
    'prenom',
    'adresseIntervention',
    'rapport',
    'actions',
    'supprimer'
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
      next: (interventions:Intervention[]) => { 
        this.dataSource.data = interventions;
        this.displaySpinner = false;
      },
      error: (data: string) => console.log(data),
    });
  }

  openDialogDelete(intervention: Intervention) {
     this.dialog.open(ModalDeleteInterventionComponent, {
      data: intervention,
    }); 
  }

  openDialogSendReport(intervention:any){
    this.dialog.open(ModalSendReportComponent,{
      data:intervention
    })
  }

  displayNotifReport(intervention:any) : boolean{
    this.date = new Date();
    if(new Date (intervention.start).getTime() + 86400000 < this.date.getTime() && !intervention.report){
      return false;
    }else{
      return true;
    } 
  }
  openFile(intervention:Intervention){
    window.open(`http://192.168.1.22:8080/${intervention.report.number}.pdf`,'_blank');
  }
}
