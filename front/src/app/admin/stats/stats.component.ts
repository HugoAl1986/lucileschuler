import { Component } from '@angular/core';
import {faSackDollar, faDatabase, faEye, faEnvelopeOpen} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent {

  faSackDollar = faSackDollar;
  faDatabase = faDatabase;
  faEye = faEye;
  faEnvelopeOpen = faEnvelopeOpen;

  cardContent : Array<Object> = [
    {
      icon : faDatabase,
      title : "Espace utilisé",
      content : "30/50 GB",
      color : "#CB8B79"
    },
    {
      icon : faSackDollar,
      title : "Revenus",
      content : "2000 \u20AC",
      option : "dernier mois",
      color : "#90CB79"
    },
    {
      icon : faEye,
      title : "Visites",
      content : "2000",
      option : "dernière semaine",
      color : "#79B9CB"
    },
    {
      icon : faEnvelopeOpen,
      title : "Contacts",
      content : "2000",
      option : "dernière semaine",
      color: "#B479CB"
    }
  ]
}
