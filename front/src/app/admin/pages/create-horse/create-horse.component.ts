import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/shared/interfaces/client.interface';
import { Horse } from 'src/app/shared/interfaces/horse.interface';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-create-horse',
  templateUrl: './create-horse.component.html',
  styleUrls: ['./create-horse.component.scss'],
})
export class CreateHorseComponent implements OnInit {
  constructor(private httpService: HttpService, private router: Router) {}

  horseForm = new FormGroup({
    nom: new FormControl('', Validators.required),
    age: new FormControl('', [Validators.required]),
    client: new FormControl('', Validators.required),
  });

  clients: Client[];

  ngOnInit(): void {
    console.log('init createhorse');
    this.httpService.getClients().subscribe((clients: Client[]) => {
      this.clients = clients;
      this.httpService.clients.next(clients);
    });
  }

  onSubmit(): void {
    if (this.horseForm.status == 'VALID') {
      this.horseForm.controls['client'].disable();
      this.httpService
        .createHorse(
          this.horseForm.value,
          this.horseForm.controls['client'].value
        )
        .subscribe((horse: Horse) => {
          const horses = this.httpService.horses.getValue();
          const clients = this.httpService.clients.getValue();
          const id = clients.findIndex((client:Client) => client.id == this.horseForm.controls['client'].value);
          clients[id].horses.push(horse);
          horses.push(horse);
          this.httpService.horses.next(horses);
          this.httpService.clients.next(clients);
          this.router.navigate(['/admin/horses']);
        });
    }
  }
}
