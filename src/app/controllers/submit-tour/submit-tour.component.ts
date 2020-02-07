import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TourService } from 'src/app/services/tour.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-submit-tour',
  templateUrl: './submit-tour.component.html',
  styleUrls: ['./submit-tour.component.scss']
})
export class SubmitTourComponent implements OnInit {

  manager;
  managers;
  tourId;

  constructor(
    private activeRoute: ActivatedRoute,
    private route: Router,
    private userService: UserService,
    private tourService: TourService,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.userService.getManagers().subscribe((response: any) => {
      this.managers = response.data;
      this.tourId = this.activeRoute.snapshot.paramMap.get('id');
    });
  }

  submit() {
    this.tourService.submit(this.tourId, { manager: this.manager })
      .subscribe((response: any) => {
        this.snackbar.open('Tour has been submitted.', '', { duration: 3000 });
        this.route.navigateByUrl(`/tours/${this.tourId}`);
      });
  }

}
