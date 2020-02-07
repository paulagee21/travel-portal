import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URL = `${environment.api_url}/users`;

  constructor(private http: HttpClient) { }

  getManagers() {
    //
  }

  saveSession(data) {
    localStorage.setItem('user-data', JSON.stringify(data));
  }

  getToken() {
    try {
      const user: any = JSON.parse(localStorage.getItem('user-data'));
      if (user) return user.access_token;
    } catch (error) { }
    return null;
  }
  
  login(data) {
    return this.http.post(`${this.API_URL}/login`, data);
  }

  logout() {

  }
}
