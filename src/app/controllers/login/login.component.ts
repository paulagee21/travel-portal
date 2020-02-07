import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private userService: UserService, private route: Router) { }

  ngOnInit() {
    if (this.userService.getToken()) {
      this.route.navigateByUrl('/tours');
    }
  }

  submit() {
    const loginData = {
      username: this.form.get('username').value,
      password: this.form.get('password').value,
    }
    this.userService.login(loginData).subscribe((response: any) => {
      this.userService.saveSession(response.data);
      this.route.navigateByUrl('/tours');
    }, (error) => {
      this.form.get('password').setErrors({ invalid: true });
    })
  }

}
