import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URL = `${environment.api_url}/users`;
  EMPLOYEE_ROLE_ID = 1;
  MANAGER_ROLE_ID = 2;
  FINANCE_MANAGER_ROLE_ID = 3;
  permissions = {
    add: [1],
    edit: [1],
    submit: [1],
    approve: [2,3],
    add_info: [1],
    request_info: [2,3],
  }

  constructor(private http: HttpClient) { }

  getManagers() {
    return this.http.get(`${this.API_URL}/managers`);
  }

  saveSession(data) {
    localStorage.setItem('user-data', JSON.stringify(data));
  }

  hasPermission(action) {
    const roleId = this.getRole();
    return this.permissions[action].indexOf(roleId) !== -1;
  }

  getRole() {
    try {
      const user: any = JSON.parse(localStorage.getItem('user-data'));
      if (user) return parseInt(user.role, 10);
    } catch (error) { }
    return null;
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
    localStorage.removeItem('user-data');
  }
}
