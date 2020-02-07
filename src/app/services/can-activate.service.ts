import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuard {

  constructor(
    private routes: Router,
    private userService: UserService,
    ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.isSessionValid()) {
        return true;
      } else {
        this.routes.navigate(['/login']);
        return false;
      }
  }

  isSessionValid() {
    let session = this.userService.getToken();
    return (session === null || session === undefined) ? false : true;
  }
}
