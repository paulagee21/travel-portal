import { Component, OnInit } from '@angular/core';
import { TourService } from 'src/app/services/tour.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.scss']
})
export class TourDetailComponent implements OnInit {

  tour;
  currentStep: number;
  state = {
    pending: {
      icon: 'help_outline',
      class: 'bg-warning',
    },
    rejected: {
      icon: 'close',
      class: 'bg-danger',
    },
    requesting: {
      icon: 'description',
      class: 'bg-primary',
    },
  } 

  constructor(
    private tourService: TourService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const tourId = this.route.snapshot.paramMap.get('id');
    const tour = this.tourService.getById(tourId);
    if (tour.status == 'pending' || tour.status == 'requesting') {
      this.currentStep = tour.approved_by ? 2 : 1; 
    } else if (tour.status == 'approved') {
      this.currentStep = 3;
    } else if (tour.status == 'rejected') {
      this.currentStep = tour.rejected_by ? 2 : 1; 
    } else if (tour.status == 'draft') {
      this.currentStep = 1;
    }
    this.tour = tour;
    console.log(tour.supporting_documents);
  }

}
