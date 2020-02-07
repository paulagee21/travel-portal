import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './controllers/login/login.component';
import { ToursComponent } from './controllers/tours/tours.component';
import { AddEditTourComponent } from './controllers/add-edit-tour/add-edit-tour.component';
import { TourDetailComponent } from './controllers/tour-detail/tour-detail.component';
import { SubmitTourComponent } from './controllers/submit-tour/submit-tour.component';
import { CanDeactivateGuard } from './services/can-deactivate.service';
import { CanActivateGuard } from './services/can-activate.service';
import { AddInfoComponent } from './controllers/add-info/add-info.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tours', component: ToursComponent, canActivate: [CanActivateGuard]},
  {
    path: 'tours/add',
    component: AddEditTourComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [CanActivateGuard],
    data: { mode: 'add' }
  },
  { path: 'tours/:id', component: TourDetailComponent, canActivate: [CanActivateGuard]},
  {
    path: 'tours/:id/edit',
    component: AddEditTourComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [CanActivateGuard],
    data: { mode: 'edit' }
  },
  { path: 'tours/:id/submit', component: SubmitTourComponent, canActivate: [CanActivateGuard]},
  { path: 'tours/:id/add-info', component: AddInfoComponent, canActivate: [CanActivateGuard]},
  { path: '',   redirectTo: '/tours', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
