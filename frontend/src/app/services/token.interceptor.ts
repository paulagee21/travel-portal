import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private user: UserService, private route: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url !== this.user.API_URL+'/login') {
      const token = this.user.getToken()
      if (token) {
        const headers = {
          'Authorization': `Bearer ${token}`,
        }
        request = request.clone({
          setHeaders: headers
        });
      } else {
        this.route.navigateByUrl('/login');
        return;
      }
    }
    return next.handle(request);
  }
}