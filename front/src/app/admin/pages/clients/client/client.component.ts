import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { Client } from 'src/app/shared/interfaces/client.interface';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit{
  constructor(
    private route: ActivatedRoute,
    private service: HttpService,
    private router: Router
  ) {
    this.idClient = this.route.snapshot.paramMap.get('id');
  }

  clientForm = new FormGroup({
    email: new FormControl({ value: '', disabled: true }, Validators.required),
    nom: new FormControl({ value: '', disabled: true }, Validators.required),
    prenom: new FormControl({ value: '', disabled: true }, Validators.required),
  });

  client: Client;
  idClient: string;
  button: string = 'Modifier';
  updateClient: Subscription;

  ngOnInit(): void {
    this.service.getClient(this.idClient).subscribe((data: Client) => {
      this.client = data;
      this.clientForm.setValue({
        email: this.client.email,
        prenom: this.client.prenom,
        nom: this.client.nom,
      });
    });
  }

  enableFields(): void {
    this.clientForm.enable();
    this.button = 'Valider';
  }

  onSubmit(): void {
    if (this.clientForm.status == 'VALID') {
      this.service
        .updateClient(this.clientForm.value, this.idClient, this.clientForm)
        .subscribe((data: Client) => {
          this.router.navigate(['/admin/clients']);
        });
    }
  }
}
