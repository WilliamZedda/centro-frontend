import { Component, OnInit, OnDestroy } from '@angular/core';
import { Alert } from 'src/app/_models/alert';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AlertsService } from 'src/app/_services/alerts.service';
import { AlertResponse } from 'src/app/_models/alert-response';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alerts-details',
  templateUrl: './alerts-details.component.html',
  styleUrls: ['./alerts-details.component.scss']
})
export class AlertsDetailsComponent implements OnInit, OnDestroy {

  idAlert: string;
  alertResponse: AlertResponse<Alert>;
  private sub: Subscription;

  constructor(private location: Location, private alertService: AlertsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.idAlert = params.idAlert;
    });

    this.sub = this.alertService.getAlert(this.idAlert).subscribe(data => {
      this.alertResponse = data;
    });
  }
  ngOnDestroy(): void {
    if (!!this.sub) {
      this.sub.unsubscribe();
    }
  }

  backClicked() {
    this.location.back();
  }
}
