import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Alert } from 'src/app/_models/alert';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertsService } from 'src/app/_services/alerts.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-alert',
  templateUrl: './update-alert.component.html',
  styleUrls: ['./update-alert.component.scss']
})
export class UpdateAlertComponent implements OnInit, OnDestroy {
  alert: Alert;
  updateAlertForm: FormGroup;
  sub: Subscription;
  submitted = false;

  constructor(private route: ActivatedRoute, private alertService: AlertsService, private router: Router, private location: Location) {
    this.updateAlertForm = new FormGroup({
      idAlert: new FormControl(''),
      idDeviceFk: new FormControl('', [Validators.required]),
      timestamp: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required, Validators.min(0)]),
      description: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.alertService.getAlert(params.idAlert).subscribe(data => {
        this.updateAlertForm.setValue({
          idAlert: params.idAlert,
          idDeviceFk: data.alert.idDeviceFk,
          timestamp: data.alert.timestamp,
          code: data.alert.code,
          description: data.alert.description
        });
      });
    });
  }
  onUpdate(): void {
    this.submitted = true;
    if (this.updateAlertForm.invalid) {
      return;
    }
    this.sub = this.alertService.update(this.updateAlertForm.value).subscribe({
      next: (data => {
        if (data.code === 0) {
          this.router.navigate(['/alerts']);
        }
      }),
      error: error => {
        console.error('Error!', error);
      },
      complete: () => {
        console.log('Completed request.');
      }
    });
  }

  get f() { return this.updateAlertForm.controls; }

  ngOnDestroy(): void {
    if (!!this.sub) {
      this.sub.unsubscribe();
    }
  }

  backClicked() {
    this.location.back();
  }
}
