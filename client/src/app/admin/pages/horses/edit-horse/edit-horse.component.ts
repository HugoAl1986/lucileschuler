import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Horse } from 'src/app/shared/interfaces/horse.interface';
import { HttpHorseService } from 'src/app/shared/services/http-horse.service';

@Component({
  selector: 'app-edit-horse',
  templateUrl: './edit-horse.component.html',
  styleUrls: ['./edit-horse.component.scss'],
})
export class EditHorseComponent implements OnInit {
  constructor(
    private httpHorseService: HttpHorseService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.idHorse = this.route.snapshot.paramMap.get('id');
  }

  horseForm: FormGroup = new FormGroup({
    nom: new FormControl({ value: '', disabled: true }, Validators.required),
    age: new FormControl({ value: '', disabled: true }, Validators.required),
    client: new FormControl(''),
  });

  idHorse: string | number;
  horse: Horse;
  button: string = 'Modifier';

  enableFields(): void {
    this.horseForm.enable();
    this.button = 'Valider';
  }

  ngOnInit(): void {
    this.httpHorseService.getHorse(this.idHorse).subscribe((horse: Horse) => {
      this.horse = horse;
      this.horseForm.setValue({
        nom: this.horse.nom,
        age: this.horse.age,
        client: this.horse.client,
      });
    });
  }

  onSubmit(): void {
    if (this.horseForm.status == 'VALID') {
      this.horse = this.horseForm.value;
      this.httpHorseService
        .updateHorse(this.idHorse, this.horse)
        .subscribe((data: Horse) => this.router.navigate(['admin/horses']));
    }
  }
}
