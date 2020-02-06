import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private user: UserService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url !== this.user.API_URL+'/login') {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.user.getToken()}`
        }
      });
    }
    return next.handle(request);
  }
}