import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TourService } from 'src/app/services/tour.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-info',
  templateUrl: './add-info.component.html',
  styleUrls: ['./add-info.component.scss']
})
export class AddInfoComponent implements OnInit {

  description = new FormControl('', [Validators.required]); 

  constructor(
    private tourService: TourService,
    private activeRoute: ActivatedRoute,
    private route: Router,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit() {
  }

  submit() {
    const tourId = this.activeRoute.snapshot.paramMap.get('id');
    const data = {
      description: this.description.value
    };
    console.log(data);
    this.tourService.addInfo(tourId, data).subscribe((response: any) => {
      this.snackbar.open('Additonal information has been added.', '', { duration: 3000 });
      this.route.navigateByUrl(`/tours/${tourId}`);
    });
  }

}
