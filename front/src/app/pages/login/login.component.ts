import { Component } from '@angular/core';
import { MatCardAppearance } from '@angular/material/card';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  raised : MatCardAppearance = 'raised'

}
