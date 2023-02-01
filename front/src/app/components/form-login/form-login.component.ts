import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router, ActivatedRoute, ParamMap, Route } from '@angular/router';
import { interval } from 'rxjs'

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormLoginComponent {

  public constructor(private snackBar: MatSnackBar, private router:Router ){
    
  }

  interval = interval(3000);
  durationInSeconds : number = 3;
  hide : boolean = true;

  loginForm = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSubmit():void {
    if(this.loginForm.status == 'VALID'){
      this.snackBar.open("Authentification réussie !!", '', {
        duration:250000,
        verticalPosition : 'top', 
        panelClass : ['d-flex', 'justify-content-center', 'my-custom-snack']
      });
      this.interval.subscribe(() => {
        this.snackBar.ngOnDestroy();
        this.router.navigate(["/admin/dashboard"]);
      });
    }
  }

}
