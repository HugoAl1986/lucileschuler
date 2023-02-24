import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Client } from 'src/app/shared/interfaces/client.interface';
import { HttpClientService } from 'src/app/shared/services/httpClient.service';

@Component({
  selector: 'app-dialog-delete-client',
  templateUrl: './dialog-delete-client.component.html',
  styleUrls: ['./dialog-delete-client.component.scss'],
})
export class DialogDeleteClientComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Client,
    private httpService: HttpClientService
  ) {}

  removeClient(): void {
    this.httpService.removeClient(this.data.id).subscribe();
  }
}
