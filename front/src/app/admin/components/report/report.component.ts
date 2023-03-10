import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { map} from 'rxjs';
import { Intervention } from 'src/app/shared/interfaces/intervention.interface';
import { BehaviourService } from 'src/app/shared/services/behaviour.service';
import { ReportService } from 'src/app/shared/services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  constructor(
    private reportService: ReportService,
    private behaviourService: BehaviourService,
    private route: ActivatedRoute
  ) {}

  datasForReport: Intervention;
  idIntervention: number;

  reportForm = new FormGroup({
    horse_infos: new FormControl('', Validators.required),
    lifestyle: new FormControl('', Validators.required),
    food: new FormControl('', Validators.required),
    activities: new FormControl('', Validators.required),
    date_intervention: new FormControl('', Validators.required),
    place_intervention: new FormControl('', Validators.required),
    owner: new FormControl('', Validators.required),
    reasons_for_session: new FormControl('', Validators.required),
    goals_of_session: new FormControl('', Validators.required),
    attitude_of_horse: new FormControl('', Validators.required),
    advice: new FormControl('', Validators.required),
    observations: new FormControl('', Validators.required),
  });

  onSubmit(): void {
    console.log(this.reportForm.value);
    this.reportService
      .createReport(this.reportForm.value)
      .subscribe((data: any) => console.log(data));
  }

  ngOnInit(): void {
    this.idIntervention = parseInt(this.route.snapshot.paramMap.get('id'));
    this.behaviourService.interventions
      .pipe(
        map((interventions: Intervention[]) => {
          const inter = _.find(interventions, (intervention: Intervention) => {
            return intervention.id == this.idIntervention;
          });
          return inter;
        })
      )
      .subscribe((intervention: Intervention) => {
        this.datasForReport = intervention;
        console.log(this.datasForReport);
        this.reportForm.patchValue({
          date_intervention: this.datasForReport['start'],
        });
      });
  }
}
