import { Component, OnInit, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import * as moment from 'moment';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-preview-tour-modal',
  templateUrl: './preview-tour-modal.component.html',
  styleUrls: ['./preview-tour-modal.component.scss']
})
export class PreviewTourModalComponent implements OnInit {

  moment: any = moment;
  @Output() saveTour = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<PreviewTourModalComponent>,
  ) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  save() {
    this.saveTour.emit('');
    this.closeDialog();
  }

}
