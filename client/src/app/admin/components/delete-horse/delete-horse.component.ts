import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Horse } from 'src/app/shared/interfaces/horse.interface';
import { HttpHorseService } from 'src/app/shared/services/http-horse.service';
import { HttpClientService } from 'src/app/shared/services/http-client.service';

@Component({
  selector: 'app-delete-horse',
  templateUrl: './delete-horse.component.html',
  styleUrls: ['./delete-horse.component.scss'],
})
export class DeleteHorseComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Horse,
    private httpHorseService: HttpHorseService
  ) {}

  removeHorse(): void {
    this.httpHorseService.removeHorse(this.data.id).subscribe();
  }
}
