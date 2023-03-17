import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Intervention } from 'src/app/shared/interfaces/intervention.interface';
import { ReportService } from 'src/app/shared/services/report.service';

@Component({
  selector: 'app-modal-send-report',
  templateUrl: './modal-send-report.component.html',
  styleUrls: ['./modal-send-report.component.scss']
})
export class ModalSendReportComponent {

constructor(@Inject(MAT_DIALOG_DATA) public data: any, private reportService:ReportService){

}
sendReport():void{
  this.reportService.sendReport(this.data.id).subscribe((data:string) => console.log(data));
}

}
