import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import {
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatTableModule,
  MatSelectModule,
  MatDividerModule,
  MatStepperModule,
  MAT_DATE_LOCALE,
} from '@angular/material';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './services/token.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToursComponent } from './controllers/tours/tours.component';
import { LoginComponent } from './controllers/login/login.component';
import { AddEditTourComponent } from './controllers/add-edit-tour/add-edit-tour.component';
import { TourDetailComponent } from './controllers/tour-detail/tour-detail.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TourDetailModalComponent } from './components/modals/tour-detail-modal/tour-detail-modal.component';
import { FilePickerModule } from 'ngx-awesome-uploader';
import { PreviewTourModalComponent } from './components/modals/preview-tour-modal/preview-tour-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CancelModalComponent } from './components/modals/cancel-modal/cancel-modal.component';
import { SubmitTourComponent } from './controllers/submit-tour/submit-tour.component';

@NgModule({
  declarations: [
    AppComponent,
    ToursComponent,
    LoginComponent,
    AddEditTourComponent,
    TourDetailComponent,
    NavbarComponent,
    TourDetailModalComponent,
    PreviewTourModalComponent,
    CancelModalComponent,
    SubmitTourComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    FilePickerModule,

    /* ANGULAR MATERIAL */
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'en-GB'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  entryComponents: [
    TourDetailModalComponent, 
    PreviewTourModalComponent,
    CancelModalComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
