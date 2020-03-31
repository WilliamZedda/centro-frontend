import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlertsComponent } from './_components/alerts/alerts.component';
import { AlertsDetailsComponent } from './_components/alerts-details/alerts-details.component';
import { AddAlertComponent } from './_components/add-alert/add-alert.component';
import { UpdateAlertComponent } from './_components/update-alert/update-alert.component';


const routes: Routes = [
  { path: 'alerts', component: AlertsComponent },
  { path: '', redirectTo: 'alerts', pathMatch: 'full' },
  { path: 'alerts/add', component: AddAlertComponent },
  { path: 'alerts/update/:idAlert', component: UpdateAlertComponent },
  { path: 'alerts/:idAlert', component: AlertsDetailsComponent },
  { path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
