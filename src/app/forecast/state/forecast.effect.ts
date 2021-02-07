import { Injectable } from '@angular/core';

import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ForecastService } from '../../shared/forecast.service';

/* NgRx */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ForecastActions from './forecast.actions';

@Injectable()
export class ForecastEffects {

  constructor(private actions$: Actions, private forecastService: ForecastService) { }

  loadForecasts$ = createEffect(() => {
    const test = this.actions$
      .pipe(
        ofType(ForecastActions.loadForecasts),
        mergeMap(() => this.forecastService.getForecasts()
          .pipe(
            map(forecasts => ForecastActions.loadForecastsSuccess({ forecasts })),
            catchError(error => of(ForecastActions.loadForecastsFailure({ error })))
          )
        )
      );
      // console.log(test);
      return test;
  });
  currentLocForecasts$ = createEffect(() => {
    const test = this.actions$
      .pipe(
        ofType(ForecastActions.currentLocForecast),
        mergeMap(action =>
          this.forecastService.currentLocForecast(action.lati, action.longi )
          .pipe(
            map(forecasts => ForecastActions.currentLocSuccess({ lati:action.lati,longi:action.longi,forecasts })),
            catchError(error => of(ForecastActions.currentLocFailure({ error })))
          )
        )
      );
      // console.log(test);
      return test;
  });
}
