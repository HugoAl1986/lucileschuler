import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Client } from 'src/app/shared/interfaces/client.interface';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-dialog-delete-client',
  templateUrl: './dialog-delete-client.component.html',
  styleUrls: ['./dialog-delete-client.component.scss'],
})
export class DialogDeleteClientComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Client,
    private httpService: HttpService
  ) {}

  removeClient(): void {
    this.httpService.removeClient(this.data.id).subscribe((data: string) => {
      const clients = this.httpService.clients.getValue();
      const index = clients.findIndex(
        (client: Client) => client.id == this.data.id
      );
      clients.splice(index, 1);
      this.httpService.clients.next(clients);
    });
  }
}
