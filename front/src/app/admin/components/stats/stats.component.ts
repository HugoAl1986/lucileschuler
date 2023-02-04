import { Component } from '@angular/core';
import {faSackDollar, faDatabase, faEye, faEnvelopeOpen, faTriangleExclamation} from '@fortawesome/free-solid-svg-icons'
import {faCalendar} from '@fortawesome/free-regular-svg-icons'

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent {

  cardContent : Array<Object> = [
    {
      icon : faDatabase,
      title : "Espace utilisé",
      content : "30/50 GB",
      color : "#CB8B79",
      iconFooter : faTriangleExclamation,
      option : "Prévenir si strockage plein !"
    },
    {
      icon : faSackDollar,
      title : "Revenus",
      content : "2000 \u20AC",
      option : "mois en cours",
      iconFooter : faCalendar,
      color : "#90CB79"
    },
    {
      icon : faEye,
      title : "Visites",
      content : "2000",
      option : "semaine en cours",
      iconFooter : faCalendar,
      color : "#79B9CB"
    },
    {
      icon : faEnvelopeOpen,
      title : "Contacts",
      content : "2000",
      option : "semaine en cours",
      iconFooter : faCalendar,
      color: "#B479CB"
    }
  ]
}
