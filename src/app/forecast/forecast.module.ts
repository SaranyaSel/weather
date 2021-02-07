import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ForecastComponent } from './forecast.component';
import { ForecastEffects } from './state/forecast.effect';
import { forecastReducer } from './state/forecast.reducer';

const forecastRoutes: Routes = [
  { path: '', component:ForecastComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(forecastRoutes),
    StoreModule.forFeature('forecasts', forecastReducer),
    EffectsModule.forFeature([ForecastEffects])
  ],
  declarations: [
    ForecastComponent
  ]
})
export class ForecastModule { }
