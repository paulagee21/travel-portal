import { Component, OnInit } from '@angular/core';
import { TourService } from 'src/app/services/tour.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.scss']
})
export class TourDetailComponent implements OnInit {

  tour;
  currentStep: number;
  canSubmit;
  canEdit;
  canApproveReject;
  canRequestInfo;
  canAddInfo;

  constructor(
    private tourService: TourService,
    private userService: UserService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit() {
    const tourId = this.route.snapshot.paramMap.get('id');
    this.tourService.getById(tourId).subscribe((response: any) => {
      const tour = response.data
      tour.hotel = parseFloat(tour.hotel);
      tour.ticket = parseFloat(tour.ticket);
      tour.airport_cab_home = parseFloat(tour.airport_cab_home);
      tour.airport_cab_destination = parseFloat(tour.airport_cab_destination);
      if (tour.manager_status) {
        if (tour.manager_status === 'approved') {
          tour.status = tour.finance_manager_status;
          this.currentStep = tour.status === 'approved' ? 3 : 2;
        } else {
          tour.status = tour.manager_status;
          this.currentStep = 1;
        }
      } else {
        tour.status = 'draft';
        this.currentStep = 0;
      }
      tour.start_date = moment(tour.start_date).format('MMM D, YYYY');
      tour.end_date = moment(tour.end_date).format('MMM D, YYYY');

      this.canEdit = this.userService.hasPermission('edit') && tour.status === 'draft';
      this.canSubmit = this.userService.hasPermission('submit') && tour.status === 'draft';
      if (this.userService.hasPermission('request_info')) {
        if (this.userService.getRole() === this.userService.MANAGER_ROLE_ID) {
          this.canRequestInfo = tour.manager_status === 'pending';
        } else {
          this.canRequestInfo = tour.finance_manager_status === 'pending'
        }
      }
      if (this.userService.hasPermission('approve')) {
        if (this.userService.getRole() === this.userService.MANAGER_ROLE_ID) {
          this.canApproveReject = tour.manager_status === 'pending';
        } else {
          this.canApproveReject = tour.finance_manager_status === 'pending'
        }
      }
      if (this.userService.hasPermission('add_info')) {
        this.canAddInfo = tour.status === 'requesting_information';
      }
      this.tour = tour;
    });
  }

  approve() {
    this.tourService.approve(this.tour.tour_id).subscribe((response: any) => {
      this.snackbar.open('Tour has been approved.', '', { duration: 3000 });
      this.tour.status = 'approved';
      this.currentStep += 1;
      this.canApproveReject = false;
      this.canRequestInfo = false;
    })
  }

  reject() {
    this.tourService.reject(this.tour.tour_id).subscribe((response: any) => {
      this.snackbar.open('Tour has been rejected.', '', { duration: 3000 });
      this.tour.status = 'rejected';
      this.canApproveReject = false;
      this.canRequestInfo = false;
    })
  }

  inquire() {
    this.tourService.inquire(this.tour.tour_id).subscribe((response: any) => {
      this.snackbar.open('You have requested more information regarding the tour.', '', { duration: 3000 });
      this.tour.status = 'requesting_information';
      this.canApproveReject = false;
      this.canRequestInfo = false;
    })
  }

}
