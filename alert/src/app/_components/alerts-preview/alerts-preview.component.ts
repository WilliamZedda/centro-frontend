import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Alert } from 'src/app/_models/alert';

@Component({
  selector: 'app-alerts-preview',
  templateUrl: './alerts-preview.component.html',
  styleUrls: ['./alerts-preview.component.scss']
})

export class AlertsPreviewComponent {
  @Input() alert: Alert;
  @Output() alertDetailEvent = new EventEmitter<Alert>();
  @Output() alertDeleteEvent = new EventEmitter<Alert>();
  @Output() alertUpdateEvent = new EventEmitter<Alert>();

  constructor() { }
  showAlert() {
    this.alertDetailEvent.emit(this.alert);
  }

  deleteAlert() {
    this.alertDeleteEvent.emit(this.alert);
  }

  updateAlert() {
    this.alertUpdateEvent.emit(this.alert);
  }
}
