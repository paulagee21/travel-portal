import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { TourService } from 'src/app/services/tour.service';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss']
})
export class ToursComponent implements OnInit {

  selectedStatusFilter = 'All';
  displayColumns = ['name', 'start_date', 'end_date', 'status'];
  tours = [];
  toursFiltered = [];

  constructor(private tourService: TourService) { }

  ngOnInit() {
    this.tours = this.tourService.getAll();
    this.tours.map((tour) => {
      tour.start_date = moment(tour.start_date).format('MMM D, YYYY');
      tour.end_date = moment(tour.end_date).format('MMM D, YYYY');
      return tour;
    });
    this.filterTours();
  }

  filterTours() {
    if (this.selectedStatusFilter !== 'All') {
      this.toursFiltered = this.tours.filter((tour) => tour.status === this.selectedStatusFilter.toLowerCase());
    } else {
      this.toursFiltered = this.tours;
    }
  }

}
