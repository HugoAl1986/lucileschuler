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
    if (!req.url.endsWith('api/login_check')) {
      const newReq = req.clone({ setHeaders : {Authorization : `Bearer ${this.authService.getLocalStorageToken()}`}})
      return next.handle(newReq);
    }
    return next.handle(req);
  }
}
