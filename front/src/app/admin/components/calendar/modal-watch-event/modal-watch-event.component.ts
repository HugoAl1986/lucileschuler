import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faUser, faClock } from '@fortawesome/free-regular-svg-icons';
import {
  faHorseHead,
  faHouse,
  faLocation,
} from '@fortawesome/free-solid-svg-icons';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-modal-watch-event',
  templateUrl: './modal-watch-event.component.html',
  styleUrls: ['./modal-watch-event.component.scss'],
})
export class ModalWatchEventComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public datasEvent,
    private utilsService: UtilsService
  ) {}
  date: Date = this.datasEvent.start;
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
    this.dateFormated['day'] = this.utilsService.formatDate(this.date).date;
    this.dateFormated['hours'] = this.utilsService.formatDate(this.date).hours;

    this.datasDisplay[0][
      'text'
    ] = `${this.datasEvent['extendedDatas']['prenom']} ${this.datasEvent['extendedDatas']['nom']}`;
    this.datasDisplay[1]['text'] = this.datasEvent['extendedDatas']['cheval'];
    this.datasDisplay[2]['text'] = this.datasEvent['extendedDatas']['ecurie'];
    this.datasDisplay[3][
      'text'
    ] = `${this.datasEvent['extendedDatas']['rue']} ${this.datasEvent['extendedDatas']['nomRue']} ${this.datasEvent['extendedDatas']['codePostal']} ${this.datasEvent['extendedDatas']['ville']}`;
    this.datasDisplay[4][
      'text'
    ] = `${this.dateFormated['day']} à ${this.dateFormated['hours']}`;
  }
}
