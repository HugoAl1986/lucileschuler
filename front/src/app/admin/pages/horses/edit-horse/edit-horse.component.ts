import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Horse } from 'src/app/shared/interfaces/horse.interface';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-edit-horse',
  templateUrl: './edit-horse.component.html',
  styleUrls: ['./edit-horse.component.scss'],
})
export class EditHorseComponent implements OnInit {
  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.idHorse = this.route.snapshot.paramMap.get('id');
  }

  horseForm: FormGroup = new FormGroup({
    nom: new FormControl({ value: '', disabled: true }, Validators.required),
    age: new FormControl({ value: '', disabled: true }, Validators.required),
    idClient: new FormControl({ value: '', disabled: true }, Validators.required),
  });

  idHorse: string | number;
  horse: Horse;
  button: string = 'Modifier';

  enableFields(): void {
    this.horseForm.enable();
    this.button = 'Valider';
  }

  ngOnInit(): void {
    this.httpService.getHorse(this.idHorse).subscribe((horse: Horse) => {
      this.horse = horse;
      this.horseForm.setValue({
        nom: this.horse.nom,
        age: this.horse.age,
        idClient: this.horse.client['id']
      });
    });
  }

  onSubmit(): void {
    if (this.horseForm.status == 'VALID') {
      this.httpService
        .updateHorse(this.idHorse, this.horseForm)
        .subscribe((data: Horse) => this.router.navigate(['admin/horses']));
    }
  }
}
