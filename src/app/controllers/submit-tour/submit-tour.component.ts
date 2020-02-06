import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TourService } from 'src/app/services/tour.service';

@Component({
  selector: 'app-submit-tour',
  templateUrl: './submit-tour.component.html',
  styleUrls: ['./submit-tour.component.scss']
})
export class SubmitTourComponent implements OnInit {

  manager;
  tourId;

  constructor(
    private route: ActivatedRoute,
    private tourService: TourService
  ) { }

  ngOnInit() {
    this.tourId = this.route.snapshot.paramMap.get('id');
  }

  submit() {
    this.tourService.submit(this.tourId, { manager: this.manager });
  }

}
