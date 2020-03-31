import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertsService } from '../../_services/alerts.service';
import { Alert } from 'src/app/_models/alert';
import { AlertResponse } from 'src/app/_models/alert-response';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Device } from 'src/app/_models/device';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit, OnDestroy {
  alertsResponse: AlertResponse<Alert[]> = new AlertResponse();
  alert: Alert = new Alert();
  alertsArray: Alert[];
  page = 1;
  pageSize = 6;

  searchText: string;
  sub: Subscription;
  private stompClient: any;
  public name: string;
  standardIconUrl = 'http://maps.google.com/mapfiles/ms/icons/red-pushpin.png';
  private alertIconUrl = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
  private postmanUrl = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
  private randomPosition: number;
  private randomAlert: number;
  myTimer: any;
  markers: Marker[] = [
    {
      lat: 40.730610,
      lng: -75.935242,
      draggable: false,
      iconUrl: this.standardIconUrl,
      device: {
        id: 'telecamera',
        type: 'telecamera',
        description: 'telecamera casello',
        brand: 'sony',
        lastUpdate: '2020-03-03T09:33:21',
        registrationTime: '2010-03-03T09:33:21',
        isActive: true,
        inManteinance: false,
        weight: 15,
        storageYears: 10
      }
    },
    {
      lat: 41.130620,
      lng: -73.935242,
      draggable: false,
      iconUrl: this.standardIconUrl,
      device: {
        id: 'sensore',
        type: 'telecamera',
        description: 'telecamera controllo veicolare',
        brand: 'samsung',
        lastUpdate: '2020-03-03T09:33:21',
        registrationTime: '2015-03-03T09:33:21',
        isActive: true,
        inManteinance: false,
        weight: 15,
        storageYears: 5
      }
    },
    {
      lat: 41.130620,
      lng: -74.635242,
      draggable: false,
      iconUrl: this.standardIconUrl,
      device: {
        id: 'websocket',
        type: 'sensore',
        description: 'sensore incendi',
        brand: 'IBM',
        lastUpdate: '2020-03-03T09:34:21',
        registrationTime: '2017-03-03T09:33:21',
        isActive: true,
        inManteinance: false,
        weight: 1,
        storageYears: 3
      }
    }
  ];
  lat = 40.730610;
  lng = -73.935242;
  zoom = 8;

  constructor(private alertsService: AlertsService, private router: Router) {
  }

  ngOnInit(): void {
    this.connect();
    this.getAllAlerts();

    const classe = this;
    this.myTimer = setInterval(() => {
      classe.randomPosition = Math.floor(Math.random() * classe.markers.length);
      classe.randomAlert = Math.floor(Math.random() * classe.alertsResponse.numberOfAlerts);
      classe.markers[classe.randomPosition].alert = classe.alertsResponse.alerts[classe.randomAlert];
      if (classe.markers[classe.randomPosition].iconUrl !== classe.postmanUrl) {
        classe.markers[classe.randomPosition].iconUrl = classe.alertIconUrl;
      }
    }, 3000);
  }

  onMarkerClick(m: Marker) {
    m.iconUrl = this.standardIconUrl;
  }

  redirectToAlertDetails(m: Marker) {
    this.router.navigate(['/alerts', m.alert.idAlert], { state: { idAlertSent: m.alert.idAlert } });
  }

  redirectToAlertOnClick(alert: Alert): void {
    this.router.navigate(['/alerts', alert.idAlert], { state: { idAlertSent: alert.idAlert } });
  }

  redirectToAddOnClick(): void {
    this.router.navigate(['/alerts/add']);
  }

  redirectToUpdateOnClick(alert: Alert): void {
    this.router.navigate(['/alerts/update/', alert.idAlert], { state: { alertSent: alert } });
  }

  deleteAlert(alert: Alert): void {
    this.alertsService.delete(alert.idAlert).toPromise().then(() => {
      this.alertsService.getAllAlerts().toPromise().then(data => {
        this.alertsResponse = data;
        this.alertsArray = data.alerts;
        if (Math.ceil((this.alertsResponse.numberOfAlerts) / this.pageSize) <= this.page) {
          this.page = this.page - 1;
        }
      });
    });
  }

  getAllAlerts() {
    /*
    this.alertsService.getAllAlerts().toPromise().then(data => {
      console.log("Get Prima: ", this.alertsResponse.numberOfAlerts);
      this.alertsResponse = data;
      console.log("Get Dopo: ", this.alertsResponse.numberOfAlerts);
    });
    */

    this.sub = this.alertsService.getAllAlerts().subscribe(data => {
      this.alertsResponse = data;
      this.alertsArray = this.alertsResponse.alerts;
    });

  }

  ngOnDestroy(): void {
    if (!!this.sub) {
      this.sub.unsubscribe();
    }
    this.disconnect();
  }

  connect(): void {
    console.log('Initialize WebSocket Connection');
    this.stompClient = Stomp.over(new SockJS(environment.webSocketEndPoint));

    const classe = this;
    this.stompClient.connect({}, () => {
      classe.stompClient.subscribe(environment.topic, (event: any) => {
        classe.onMessageReceived(event);
      });
    }, this.errorCallBack);
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  // In caso di errore prova a riconnettersi dopo 5 secondi
  errorCallBack(error: any) {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
      this.connect();
    }, 5000);
  }

  onMessageReceived(message: any) {
    console.log('Message Recieved from Server :: ' + message);
    this.alert = JSON.parse(message.body);
    this.alertsResponse.numberOfAlerts = this.alertsResponse.alerts.push(this.alert);
    this.alertsArray.push(this.alert);
    this.markers.forEach(marker => {
      if (marker.device.id === this.alertsResponse.alerts[this.alertsResponse.numberOfAlerts - 1].idDeviceFk) {
        marker.iconUrl = this.postmanUrl;
        marker.alert = this.alertsResponse.alerts[this.alertsResponse.numberOfAlerts - 1];
      }
    });
  }
}

interface Marker {
  lat: number;
  lng: number;
  draggable: boolean;
  iconUrl: string;
  device: Device;
  alert?: Alert;
}
