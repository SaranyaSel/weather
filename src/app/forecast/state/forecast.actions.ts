import { createAction, props } from "@ngrx/store";
import { Forecast } from "src/app/shared/forecast";

export const loadForecasts = createAction(
  '[Forecast] Load'
);

export const loadForecastsSuccess = createAction(
  '[Forecast] Load Success',
  props<{ forecasts: Forecast[] }>()
);

export const loadForecastsFailure = createAction(
  '[Forecast] Load Fail',
  props<{ error: string }>()
);
export const currentLocForecast = createAction(
  '[Forecast] currentLoc',
  props<{ lati: any, longi:any }>()
);

export const currentLocSuccess = createAction(
  '[Forecast] currentLoc Success',
  props<{ lati: any, longi:any, forecasts: Forecast[]  }>()
);

export const currentLocFailure = createAction(
  '[Forecast] currentLoc  Fail',
  props<{ error: string }>()
);
