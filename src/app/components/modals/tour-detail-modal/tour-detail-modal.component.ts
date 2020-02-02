import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-tour-detail-modal',
  templateUrl: './tour-detail-modal.component.html',
  styleUrls: ['./tour-detail-modal.component.scss']
})
export class TourDetailModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<TourDetailModalComponent>,
  ) { }

  ngOnInit() {
  }

}
