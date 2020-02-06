import { Component, OnInit } from '@angular/core';
import { FilePickerAdapter } from 'src/app/services/file-upload.service';
import { MatDialog } from '@angular/material';
import { PreviewTourModalComponent } from 'src/app/components/modals/preview-tour-modal/preview-tour-modal.component';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { CancelModalComponent } from 'src/app/components/modals/cancel-modal/cancel-modal.component';
import { Router, ActivatedRoute } from '@angular/router';
import { TourService } from 'src/app/services/tour.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-edit-tour',
  templateUrl: './add-edit-tour.component.html',
  styleUrls: ['./add-edit-tour.component.scss']
})
export class AddEditTourComponent implements OnInit {

  canDeactivate = false;
  activePanel: number = 1;
  progress: number = 1;
  fileAdapter = new FilePickerAdapter();
  tomorrow = new Date();
  tourForm = new FormGroup({
    destination: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    mode: new FormControl('', [Validators.required]),
    conveyance: new FormControl('', [Validators.required]),
    hotel: new FormControl('', [Validators.required, Validators.min(0)]),
    ticket: new FormControl('', [Validators.required, Validators.min(0)]),
    cabAtHome: new FormControl('', [Validators.required, Validators.min(0)]),
    cabAtDestination: new FormControl('', [Validators.required, Validators.min(0)]),
    supportingDocuments: new FormArray([]),
  })
  fieldMap = [
    { form: 'destination', api: 'destination' },
    { form: 'description', api: 'description' },
    { form: 'startDate', api: 'start_date' },
    { form: 'endDate', api: 'end_date' },
    { form: 'mode', api: 'mode' },
    { form: 'conveyance', api: 'conveyance' },
    { form: 'ticket', api: 'ticket' },
    { form: 'hotel', api: 'hotel' },
    { form: 'cabAtHome', api: 'airport_cab_home' },
    { form: 'cabAtDestination', api: 'airport_cab_destination' },

  ]
  mode;

  constructor(
    private dialog: MatDialog,
    private route: Router,
    private activeRoute: ActivatedRoute,
    private tourService: TourService,
  ) { 
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
  }

  ngOnInit() {
    this.activeRoute.data.subscribe((d) => {
      this.mode = d.mode;
      if (d.mode === 'edit') {
        const brandId = this.activeRoute.snapshot.paramMap.get('id');
        this.setupFormValues(brandId);
      }
    })
  }

  setupFormValues(id) {
    const tour = this.tourService.getById(id);
    this.fieldMap.forEach((map) => {
      if (map.form === 'startDate' || map.form === 'endDate') {
        const date = new Date(tour[map.api]);
        this.tourForm.get(map.form).setValue(date);
      } else {
        this.tourForm.get(map.form).setValue(tour[map.api]);
      }
    })
  }

  greaterThanStart(d: Date) {
    console.log(this.tourForm);
    console.log(this.tourForm.get('startDate'));
    const startDate = new Date(this.tourForm.get('startDate').value);
    console.log(startDate);

  }

  addSupportingDocument(document) {
    const docs = this.tourForm.get('supportingDocuments') as FormArray;
    docs.push(new FormControl({ description: document.description, image: document.image }));
  }

  nextStep(currStep) {
    this.activePanel = currStep + 1;
    if (currStep === this.progress) {
      this.progress += 1;
    }
  }

  finish() {
    const data: any = {};
    this.fieldMap.forEach((field) => {
      data[field.form] = this.tourForm.get(field.form).value;
    })
    data.supportingDocuments = this.tourForm.get('supportingDocuments').value;
    const modal = this.dialog.open(PreviewTourModalComponent, {
      width: '700px',
      data: data 
    });

    modal.componentInstance.saveTour.on('', () => {
      this.submitForm();
    })
  }

  submitForm() {
    //call api
  }

  expandPanel(step) {
    this.activePanel = step;
  }

  cancel() {
    const dialog = this.dialog.open(CancelModalComponent, { width: '500px' });
    dialog.componentInstance.callback = () => {
      this.canDeactivate = true;
      this.route.navigateByUrl('/tours');
    }
  }

  onUploadSuccess() { }

  onRemoveSuccess() { }
}
