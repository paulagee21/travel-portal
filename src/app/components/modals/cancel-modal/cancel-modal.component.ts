import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-cancel-modal',
  templateUrl: './cancel-modal.component.html',
  styleUrls: ['./cancel-modal.component.scss']
})
export class CancelModalComponent implements OnInit {

  callback: Function;

  constructor(private dialogRef: MatDialogRef<CancelModalComponent>) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  cancel() {
    if (this.callback) {
      this.callback();
    }
    this.dialogRef.close();
  }

}
