import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import {
  MatIconModule,
  MatListModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
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
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToursComponent } from './controllers/tours/tours.component';
import { LoginComponent } from './controllers/login/login.component';
import { AddEditTourComponent } from './controllers/add-edit-tour/add-edit-tour.component';
import { TourDetailComponent } from './controllers/tour-detail/tour-detail.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TourDetailModalComponent } from './components/modals/tour-detail-modal/tour-detail-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ToursComponent,
    LoginComponent,
    AddEditTourComponent,
    TourDetailComponent,
    NavbarComponent,
    TourDetailModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    /* ANGULAR MATERIAL */
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatStepperModule,
    MatTableModule,
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ],
  entryComponents: [TourDetailModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
