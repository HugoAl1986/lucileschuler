import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(this.authService.token);
    if (!req.url.endsWith('api/login_check')) {
      console.log("test");
      const newReq = req.clone({ setHeaders : {Authorization : `Bearer ${this.authService.token}`}})
      return next.handle(newReq);
    }
    return next.handle(req);
  }
}
