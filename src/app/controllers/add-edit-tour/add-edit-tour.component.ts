import { Component, OnInit } from '@angular/core';
import { FilePickerAdapter } from 'src/app/services/file-upload.service';
import { MatDialog } from '@angular/material';
import { PreviewTourModalComponent } from 'src/app/components/modals/preview-tour-modal/preview-tour-modal.component';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-edit-tour',
  templateUrl: './add-edit-tour.component.html',
  styleUrls: ['./add-edit-tour.component.scss']
})
export class AddEditTourComponent implements OnInit {

  activePanel: number = 1;
  progress: number = 1;
  fileAdapter = new FilePickerAdapter();
  tourForm = new FormGroup({
    destination: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    mode: new FormControl('', [Validators.required]),
    conveyance: new FormControl('', [Validators.required]),
    hotel: new FormControl('', [Validators.required]),
    ticket: new FormControl('', [Validators.required]),
    cabAtHome: new FormControl('', [Validators.required]),
    cabAtDestination: new FormControl('', [Validators.required]),
    supportingDocuments: new FormArray([]),
  })

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  addSupportingDocument(document) {
    const docs = this.tourForm.get('supportingDocuments') as FormArray;
    docs.push(new FormControl({ description: document.description, image: document.image }));
  }

  nextStep() {
    this.activePanel += 1;
    this.progress += 1;
  }

  finish() {
    const modal = this.dialog.open(PreviewTourModalComponent, {
      width: '700px',
      data: {
        destination: this.tourForm.get('destination').value,
        description: this.tourForm.get('description').value,
        startDate: this.tourForm.get('startDate').value,
        endDate: this.tourForm.get('endDate').value,
        mode: this.tourForm.get('mode').value,
        conveyance: this.tourForm.get('conveyance').value,
        hotel: this.tourForm.get('hotel').value,
        ticket: this.tourForm.get('ticket').value,
        cabAtHome: this.tourForm.get('cabAtHome').value,
        cabAtDestination: this.tourForm.get('cabAtDestination').value,
        supportingDocuments: this.tourForm.get('supportingDocuments').value,
      }
    });

    modal.componentInstance.saveTour.on('', () => {
      this.submitForm();
    })
  }

  submitForm() {
    //call api
  }

  expandPanel(number) {
    this.activePanel = number;
  }

  onUploadSuccess() { }

  onRemoveSuccess() { }
}
