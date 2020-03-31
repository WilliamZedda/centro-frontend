import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/_models/alert';
import { Subscription } from 'rxjs';
import { AlertsService } from 'src/app/_services/alerts.service';

@Component({
  selector: 'app-add-alert',
  templateUrl: './add-alert.component.html',
  styleUrls: ['./add-alert.component.scss']
})
export class AddAlertComponent implements OnInit, OnDestroy {
  alert: Alert;
  addAlertForm: FormGroup;
  sub: Subscription;
  submitted = false;

  constructor(private router: Router, private alertService: AlertsService) {
    this.addAlertForm = new FormGroup({
      idDeviceFk: new FormControl('', [Validators.required]),
      timestamp: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required, Validators.min(0)]),
      description: new FormControl('', [Validators.required])
    });
  }
  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.addAlertForm.invalid) {
      return;
    }
    this.sub = this.alertService.insert(this.addAlertForm.value).subscribe({
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

  get f() { return this.addAlertForm.controls; }

  onReset() {
    this.submitted = false;
    this.addAlertForm.reset();
  }

  ngOnDestroy(): void {
    if (!!this.sub) {
      this.sub.unsubscribe();
    }
  }
  backClicked() {
    this.router.navigate(['/alerts']);
  }
}
