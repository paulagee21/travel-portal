import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user.service';
import { TourService } from 'src/app/services/tour.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tour-detail-modal',
  templateUrl: './tour-detail-modal.component.html',
  styleUrls: ['./tour-detail-modal.component.scss']
})
export class TourDetailModalComponent implements OnInit {

  canSubmit;
  canEdit;
  canApproveReject;
  canRequestInfo;
  canAddInfo;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<TourDetailModalComponent>,
    private userService: UserService,
    private tourService: TourService,
    private snackbar: MatSnackBar,
    private route: Router,
  ) { 
    data.created_at = moment(data.created_at).format('MMM D, YYYY');
    this.canEdit = this.userService.hasPermission('edit');
    this.canSubmit = this.userService.hasPermission('submit') && data.status === 'draft';
    if (this.userService.hasPermission('request_info')) {
      if (this.userService.getRole() === this.userService.MANAGER_ROLE_ID) {
        this.canRequestInfo = data.manager_status === 'pending';
      } else {
        this.canRequestInfo = data.finance_manager_status === 'pending'
      }
    }
    if (this.userService.hasPermission('approve')) {
      if (this.userService.getRole() === this.userService.MANAGER_ROLE_ID) {
        this.canApproveReject = data.manager_status === 'pending';
      } else {
        this.canApproveReject = data.finance_manager_status === 'pending'
      }
    }
    if (this.userService.hasPermission('add_info')) {
      this.canAddInfo = data.status === 'requesting_information';
    }
  }

  ngOnInit() {
  }

  approve() {
    this.tourService.approve(this.data.tour_id).subscribe((response: any) => {
      this.dialogRef.close();
      this.snackbar.open('Tour has been approved.', '', { duration: 3000 });
      this.route.navigateByUrl(`/tours/${this.data.tour_id}`);
    })
  }

  reject() {
    this.tourService.reject(this.data.tour_id).subscribe((response: any) => {
      this.dialogRef.close();
      this.snackbar.open('Tour has been rejected.', '', { duration: 3000 });
      this.route.navigateByUrl(`/tours/${this.data.tour_id}`);
    })
  }

  inquire() {
    this.tourService.inquire(this.data.tour_id).subscribe((response: any) => {
      this.dialogRef.close();
      this.snackbar.open('You have requested more information regarding the tour.', '', { duration: 3000 });
      this.route.navigateByUrl(`/tours/${this.data.tour_id}`);
    })
  }

}
