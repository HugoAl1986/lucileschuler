import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Horse } from 'src/app/shared/interfaces/horse.interface';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-delete-horse',
  templateUrl: './delete-horse.component.html',
  styleUrls: ['./delete-horse.component.scss']
})
export class DeleteHorseComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Horse,
    private httpService: HttpService
  ) {}

  removeClient(): void {
    this.httpService.removeHorse(this.data.id).subscribe();
  }
}
