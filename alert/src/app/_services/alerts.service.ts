import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AlertResponse } from '../_models/alert-response';
import { Alert } from '../_models/alert';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AlertsService {
  constructor(private httpClient: HttpClient) { }

  /*
  piuttosto che fare una get all di tutti gli alerts fai una get che restituisce i risultati di 10 in 10.
  click su freccia per mostrare i prossimi dell'elenco
  idee di getAllAlerts:
  elenco risultati con possibilità di navigazione? prendi i risultati delle prime x pagine e le ultime x con due query
  in base alla pagina visualizza i risultati

   TODO Cerca paginazione mongoDB
  */
  getAllAlerts(): Observable<AlertResponse<Alert[]>> {
    return this.httpClient.get<AlertResponse<Alert[]>>(environment.apiUrl).pipe(
      tap(_ => console.log('fetched alerts')),
      catchError(this.handleError<AlertResponse<Alert[]>>('getAlerts'))
    );
  }

  getAlert(idAlert: string): Observable<AlertResponse<Alert>> {
    return this.httpClient.get<AlertResponse<Alert>>(environment.apiUrl + '/' + idAlert).pipe(
      tap(_ => console.log('fetched alert')),
      catchError(this.handleError<AlertResponse<Alert>>('getAlert'))
    );
  }

  insert(alert: Alert): Observable<AlertResponse<Alert[]>> {
    return this.httpClient.post<AlertResponse<Alert[]>>(environment.apiUrl, alert).pipe(
      tap(_ => console.log('added alert')),
      catchError(this.handleError<AlertResponse<Alert[]>>('addAlert'))
    );
  }

  delete(idAlert: string): Observable<AlertResponse<Alert[]>> {
    return this.httpClient.delete<AlertResponse<Alert[]>>(environment.apiUrl + '/' + idAlert).pipe(
      tap(_ => console.log('deleted alert')),
      catchError(this.handleError<AlertResponse<Alert[]>>('addAlert'))
    );
  }

  update(alert: Alert): Observable<AlertResponse<Alert[]>> {
    return this.httpClient.put<AlertResponse<Alert[]>>(environment.apiUrl, alert).pipe(
      tap(_ => console.log('updated alert')),
      catchError(this.handleError<AlertResponse<Alert[]>>('addAlert'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result);
    };
  }
}
