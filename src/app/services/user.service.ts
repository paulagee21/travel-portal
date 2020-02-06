import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URL = `${environment.api_url}/users`;

  constructor() { }

  getManagers() {
    //
  }

  getToken() {
    const user: any = localStorage.getItem('user-data');
    return user.access_token;
  }
  
  login() {
    //
  }

  logout() {

  }
}
