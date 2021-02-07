import { List } from "./list";

export interface Forecast {
  cod: string;
  message: number;
  cnt: number;
  list: List [];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}
