import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Forecast } from "src/app/shared/forecast";
import * as ForecastActions from './forecast.actions';
import * as AppState from '../../State/app.state';

export interface State extends AppState.State {
  forecasts: ForecastState;
}

export interface ForecastState {
  currentForecast: Forecast;
  forecasts: Forecast[];
  lati:any;
  longi:any;
  error: string;
}
const initialState: ForecastState  = {
  currentForecast: null,
  forecasts: [],
  lati:'',
  longi:'',
  error: ''
};
// Selector functions
const getForecastFeatureState = createFeatureSelector<ForecastState>('forecasts');
export const getForecasts = createSelector(
  getForecastFeatureState,
  state =>state.forecasts
);
export const currentLocForecast = createSelector(
  getForecastFeatureState,
  state =>state.forecasts
);

export const getError = createSelector(
  getForecastFeatureState,
  state => state.error
);

export const forecastReducer = createReducer<ForecastState>(
  initialState,
  on(ForecastActions.loadForecastsSuccess, (state, action): ForecastState => {
    // console.log("test",state,action);
    return {
      ...state,
      forecasts: action.forecasts,
      error: ''
    };
  }),
  on(ForecastActions.loadForecastsFailure, (state, action): ForecastState => {
    return {
      ...state,
      forecasts: [],
      error: action.error
    };
  }),
  on(ForecastActions.currentLocSuccess, (state, action): ForecastState => {
    return {
      ...state,
      lati: action.lati,
      longi:action.longi,
      forecasts:  action.forecasts,
      error: ''
    };
  }),
  on(ForecastActions.currentLocFailure, (state, action): ForecastState => {
    return {
      ...state,
      error: action.error
    };
  })

);
