import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './controllers/login/login.component';
import { ToursComponent } from './controllers/tours/tours.component';
import { AddEditTourComponent } from './controllers/add-edit-tour/add-edit-tour.component';
import { TourDetailComponent } from './controllers/tour-detail/tour-detail.component';
import { CanDeactivateGuard } from './services/can-deactivate.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tours', component: ToursComponent },
  { path: 'tours/add', component: AddEditTourComponent, canDeactivate: [CanDeactivateGuard]},
  { path: 'tours/:id', component: TourDetailComponent },
  { path: '',   redirectTo: '/tours', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
