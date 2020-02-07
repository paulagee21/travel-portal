import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  showLogout;

  constructor(private route: Router, private userService: UserService) { }

  ngOnInit() {
    if (this.userService.getToken()) {
      this.showLogout = true;
    }
  }

  logout() {
    this.userService.logout();
    this.route.navigateByUrl('/login');
  }

}
