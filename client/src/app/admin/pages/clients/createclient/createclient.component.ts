import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/shared/interfaces/client.interface';
import { HttpClientService } from 'src/app/shared/services/http-client.service';

@Component({
  selector: 'app-createclient',
  templateUrl: './createclient.component.html',
  styleUrls: ['./createclient.component.scss'],
})
export class CreateclientComponent implements OnDestroy {
  constructor(private httpService: HttpClientService, private router: Router) {}

  clientForm = new FormGroup({
    email: new FormControl('', Validators.required),
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
  });

  clients: Client[];

  subscriptionCreateClient: Subscription;

  onSubmit(): void {
    if (this.clientForm.status == 'VALID') {
      this.subscriptionCreateClient = this.httpService
        .createClient(this.clientForm.value)
        .subscribe((data: Client) => this.router.navigate(['/admin/clients']));
    }
  }

  ngOnDestroy(): void {
    if (this.subscriptionCreateClient) {
      this.subscriptionCreateClient.unsubscribe();
    }
  }
}
