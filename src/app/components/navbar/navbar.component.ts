import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private route: Router, private userService: UserService) { }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
    this.route.navigateByUrl('/login');
  }

}
