import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  getForecasts,
  getError,
  currentLocForecast,
} from "./state/forecast.reducer";
import * as ForecastActions from "./state/forecast.actions";
import { Store } from "@ngrx/store";
import { Forecast } from "../shared/forecast";
import { Observable } from "rxjs";
import { State } from "../State/app.state";
import { ForecastService } from "../shared/forecast.service";
@Component({
  selector: "app-forecast",
  templateUrl: "./forecast.component.html",
  styleUrls: ["./forecast.component.scss"],
})
export class ForecastComponent implements OnInit {
  pageTitle = "WeatherForecast";

  forecasts$: Observable<Forecast[]>;
  errorMessage$: Observable<string>;
  today = new Date();
  tomorrow = new Date(this.today);
  thirdday = new Date(this.today);
  fourthday = new Date(this.today);
  @ViewChild("#geo", { static: false }) geo: ElementRef;
  lati: any;
  longi: any;
  postions:any;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    this.thirdday.setDate(this.thirdday.getDate() + 2);
    this.fourthday.setDate(this.fourthday.getDate() + 3);
    this.forecasts$ = this.store.select(getForecasts);
    this.errorMessage$ = this.store.select(getError);
    this.store.dispatch(ForecastActions.loadForecasts());
  }
  currentLoc() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.postions = position.coords;
        console.log(this.postions,this.postions.latitude);
        this.passLoc(this.postions.latitude,this.postions.longitude);
      });

    } else {
      this.geo.nativeElement.innerHTML =
        "Geolocation is not supported by this browser.";
    }
  }

  passLoc(lat:any,lon:any){
    console.log(lat,lon);
    this.store.dispatch(
      ForecastActions.currentLocForecast({
        lati:lat,
        longi:lon,
      })
    );
  }
}
