import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor() {
    
  }
  authSnackbarOpen(snackBar:MatSnackBar) {
    return snackBar.open('Authentification réussie !!', '', {
      verticalPosition: 'top',
      panelClass: ['d-flex', 'justify-content-center', 'my-custom-snack'],
    });
  }

  destroySnackBar(snackBar:MatSnackBar){
    return snackBar.ngOnDestroy();
  }
}
