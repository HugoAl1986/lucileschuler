import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';

const MATERIALS = [
  MatButtonModule,
  MatCardModule,
  MatInputModule
]

@NgModule({
  declarations: [],
  imports: MATERIALS,
  exports : MATERIALS
})
export class MaterialModule { }
