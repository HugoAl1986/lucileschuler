import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { GlobalService } from 'src/app/shared/services/global.service';
import { HttpClientService } from 'src/app/shared/services/httpClient.service';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss'],
})
export class FormLoginComponent implements OnDestroy {
  public constructor(
    private snackBar: MatSnackBar,
    private globalService: GlobalService,
    private router: Router,
    private httpService: HttpClientService,
    private authService: AuthService
  ) {}

  interval = interval(1000);
  subscriptionInterval: Subscription;
  subscriptionServiceLogin: Subscription;
  hide: boolean = true;
  user: User = {
    username: '',
    password: '',
  };
  token: string;
  displaySpinner: boolean = false;
  errorLoggin: string = '';

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSubmit(): void {
    if (this.loginForm.status == 'VALID') {
      this.user.username = this.loginForm.value['username'];
      this.user.password = this.loginForm.value['password'];
      this.displaySpinner = true;
      this.subscriptionServiceLogin = this.httpService
        .loggin(this.user)
        .subscribe({
          next: (data: any) => {
            this.displaySpinner = false;
            this.authService.setLocalStorageToken(data.token);
            this.globalService.authSnackbarOpen(this.snackBar);
            this.subscriptionInterval = this.interval.subscribe(() => {
              this.router.navigate(['/admin']);
            });
          },
          error: (error) => {
            console.log(error);
            this.errorLoggin = error.error['message'];
            this.displaySpinner = false;
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.subscriptionInterval.unsubscribe();
    this.globalService.destroySnackBar(this.snackBar);
    this.subscriptionServiceLogin.unsubscribe();
  }
}
