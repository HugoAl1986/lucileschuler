import { Component, OnInit } from '@angular/core';
import {
  faSackDollar,
  faEye,
  faEnvelopeOpen,
  faTriangleExclamation,
  faBell,
} from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { BehaviourService } from 'src/app/shared/services/behaviour.service';
import { Intervention } from 'src/app/shared/interfaces/intervention.interface';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { combineLatest, forkJoin } from 'rxjs';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  constructor(
    private behaviourService: BehaviourService,
    private utilsService: UtilsService
  ) {}

  interventions: Intervention[];
  turnoverForMonth: number;
  notifReport: number;
  notifMessages : number;
  numberMessagesMonth: number;
  cardContent: Array<Object>;

  ngOnInit(): void {
    combineLatest([
      this.behaviourService.ObservableInterventionsToGetMonthTurnover,
      this.behaviourService.ObservableInterventionsToGetNotifReport,
      this.behaviourService.ObservableContactMailToGetNotifReadMessage,
      this.behaviourService.ObservableContactMailToGetNumberMessageWeekInProgress
    ]).subscribe(([dataFromMonth, dataFromNotif, dataFromMessages,dataNumberMessage]) => {
      this.turnoverForMonth = dataFromMonth;
      this.notifReport = dataFromNotif;
      this.notifMessages = dataFromMessages;
      this.numberMessagesMonth = dataNumberMessage;
      console.log(this.numberMessagesMonth);
      this.initCardContent();
    });
  }

  initCardContent(): void {
    this.cardContent = [
      {
        icon: faBell,
        title: 'Notifications',
        content: {
          report: this.notifReport,
          mail: this.notifMessages,
        },
        color: '#CB8B79',
        iconFooter: faTriangleExclamation,
      },
      {
        icon: faSackDollar,
        title: 'Revenus',
        content: `${this.turnoverForMonth} \u20AC`,
        option: 'mois en cours',
        iconFooter: faCalendar,
        color: '#90CB79',
      },
      {
        icon: faEye,
        title: 'Visites',
        content: '...',
        option: 'mois en cours',
        iconFooter: faCalendar,
        color: '#79B9CB',
      },
      {
        icon: faEnvelopeOpen,
        title: 'Contacts',
        content: this.numberMessagesMonth,
        option: 'mois en cours',
        iconFooter: faCalendar,
        color: '#B479CB',
      },
    ];
  }
}
