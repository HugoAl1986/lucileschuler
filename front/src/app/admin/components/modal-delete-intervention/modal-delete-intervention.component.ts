import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Intervention } from 'src/app/shared/interfaces/intervention.interface';
import { HttpInterventionService } from 'src/app/shared/services/http-intervention.service';

@Component({
  selector: 'app-modal-delete-intervention',
  templateUrl: './modal-delete-intervention.component.html',
  styleUrls: ['./modal-delete-intervention.component.scss']
})
export class ModalDeleteInterventionComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Intervention,
    private httpInterventionService: HttpInterventionService
  ) {
    console.log(this.data);
  }

  removeIntervention(): void {
    this.httpInterventionService.deleteIntervention(this.data.id).subscribe((data:string) => console.log(data));
  }
}
