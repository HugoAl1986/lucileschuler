import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faUser, faClock } from '@fortawesome/free-regular-svg-icons';
import {
  faHorseHead,
  faHouse,
  faLocation,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal-watch-event',
  templateUrl: './modal-watch-event.component.html',
  styleUrls: ['./modal-watch-event.component.scss'],
})
export class ModalWatchEventComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public datasEvent) {}
  date:Date
  dateFormated = {
    day: '',
    hours: '',
  };

  datasDisplay = [
    {
      icon: faUser,
      text: '',
    },
    {
      icon: faHorseHead,
      text: '',
    },
    {
      icon: faHouse,
      text: '',
    },
    {
      icon: faLocation,
      text: '',
    },
    {
      icon: faClock,
      text: '',
    },
  ];

  ngOnInit(): void {
    this.date = new Date(this.datasEvent.start.replace('Z',''));
    console.log(this.datasEvent);
    this.datasDisplay[0][
      'text'
    ] = `${this.datasEvent['extendedDatas']['prenom']} ${this.datasEvent['extendedDatas']['nom']}`;
    this.datasDisplay[1]['text'] = this.datasEvent['extendedDatas']['cheval'];
    this.datasDisplay[2]['text'] = this.datasEvent['extendedDatas']['adresseIntervention']['nomEcurie'];
    this.datasDisplay[3][
      'text'
    ] = `${this.datasEvent['extendedDatas']['adresseIntervention']['numeroRue']} ${this.datasEvent['extendedDatas']['adresseIntervention']['rue']} ${this.datasEvent['extendedDatas']['adresseIntervention']['codePostal']} ${this.datasEvent['extendedDatas']['adresseIntervention']['ville']}`;
    this.datasDisplay[4]['text'] = `${this.date.toLocaleString('fr-FR')}`;
  }
}
