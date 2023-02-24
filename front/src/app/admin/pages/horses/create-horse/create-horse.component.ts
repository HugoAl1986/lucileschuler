import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/shared/interfaces/client.interface';
import { Horse } from 'src/app/shared/interfaces/horse.interface';
import { HttpHorseService } from 'src/app/shared/services/http-horse.service';
import { HttpClientService } from 'src/app/shared/services/httpClient.service';

@Component({
  selector: 'app-create-horse',
  templateUrl: './create-horse.component.html',
  styleUrls: ['./create-horse.component.scss'],
})
export class CreateHorseComponent implements OnInit {
  constructor(private httpClientService: HttpClientService, private httpHorseService:HttpHorseService, private router: Router) {}

  horseForm = new FormGroup({
    nom: new FormControl('', Validators.required),
    age: new FormControl('', [Validators.required]),
    client: new FormControl('', Validators.required),
  });

  clients: Client[];

  ngOnInit(): void {
    this.httpClientService.clients.subscribe(
      (clients: Client[]) => (this.clients = clients)
    );
  }

  onSubmit(): void {
    if (this.horseForm.status == 'VALID') {
      this.horseForm.controls['client'].disable();
      this.httpHorseService
        .createHorse(
          this.horseForm.value,
          this.horseForm.controls['client'].value
        )
        .subscribe((horse: Horse) => {
          this.router.navigate(['/admin/horses']);
        });
    }
  }
}
