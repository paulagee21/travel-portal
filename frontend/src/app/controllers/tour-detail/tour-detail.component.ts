import { Component, OnInit } from '@angular/core';
import { TourService } from 'src/app/services/tour.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.scss']
})
export class TourDetailComponent implements OnInit {

  tour;
  currentStep: number;

  constructor(
    private tourService: TourService,
    private route: ActivatedRoute,
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
      this.tour = tour;
    });
  }

}
