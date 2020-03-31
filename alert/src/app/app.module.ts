import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertsComponent } from './_components/alerts/alerts.component';
import { AlertsPreviewComponent } from './_components/alerts-preview/alerts-preview.component';
import { AlertsDetailsComponent } from './_components/alerts-details/alerts-details.component';
import { AddAlertComponent } from './_components/add-alert/add-alert.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateAlertComponent } from './_components/update-alert/update-alert.component';
import { AgmCoreModule } from '@agm/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { AlertsFilterPipe } from './_utilities/_pipes/alerts-filter.pipe';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    AlertsComponent,
    AlertsPreviewComponent,
    AlertsDetailsComponent,
    AddAlertComponent,
    UpdateAlertComponent,
    AlertsFilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAUnuPXweOavCoI5FlyO5z4UXf_6y74Zfg'
    }),
    NgxPaginationModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
