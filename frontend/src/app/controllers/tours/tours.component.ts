import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { TourService } from 'src/app/services/tour.service';
import { MatDialog } from '@angular/material';
import { TourDetailModalComponent } from 'src/app/components/modals/tour-detail-modal/tour-detail-modal.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss']
})
export class ToursComponent implements OnInit {

  selectedStatusFilter = 'All';
  displayColumns = ['destination', 'start_date', 'end_date', 'status'];
  tours = [];
  toursFiltered = [];
  canAdd;

  constructor(
    private tourService: TourService,
    private dialog: MatDialog,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.canAdd = this.userService.hasPermission('add');
    this.tourService.getAll().subscribe((response: any) =>{
      this.tours = response.data;
      this.tours.map((tour) => {
        if (tour.manager_status) {
          if (this.userService.getRole() === this.userService.MANAGER_ROLE_ID) {
            tour.status = tour.manager_status;
          } else {
            tour.status = tour.finance_manager_status ? tour.finance_manager_status : tour.manager_status;
          }
        } else {
          tour.status = 'draft';
        }
        tour.start_date = moment(tour.start_date).format('MMM D, YYYY');
        tour.end_date = moment(tour.end_date).format('MMM D, YYYY');
        return tour;
      });
      this.filterTours();
    });
  }

  filterTours() {
    if (this.selectedStatusFilter !== 'All') {
      this.toursFiltered = this.tours.filter((tour) => tour.status === this.selectedStatusFilter.toLowerCase());
    } else {
      this.toursFiltered = this.tours;
    }
  }

  viewTourDetail(tour) {
    this.dialog.open(TourDetailModalComponent, { width: '500px',  data: tour });
  }

}
