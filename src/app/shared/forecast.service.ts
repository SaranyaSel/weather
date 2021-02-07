import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Forecast } from './forecast';
import { Observable, of, throwError } from 'rxjs';

import { catchError, tap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  forecasts: Forecast[];
  lati:any;
  longi:any;
  private url = 'http://api.openweathermap.org/data/2.5/forecast?q=Blacktown,AU&appid=2f48f28ad812bc01a59934ba204da503';
  constructor(private http: HttpClient) { }
  getForecasts(): Observable<Forecast[]> {
    let test = this.http.get<Forecast[]>(this.url)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
      return test;
  }
  currentLocForecast(lati,longi): Observable<any> {
    let locUrl ='http://api.openweathermap.org/data/2.5/forecast?lat='+lati+'&lon='+longi+'&appid=2f48f28ad812bc01a59934ba204da503';
    return this.http.get<any>(locUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  private handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
