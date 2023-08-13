// vendor
import {observable, makeObservable} from 'mobx'
// types
import {CurrentWeather} from "@/features/weather/types/type";
import {GeoStorage} from "@/features/geo/types/type";
// services
import WeatherFetchService from "@/features/weather/service/WeatherFetchService";
import LocalStorageService from "@/features/localStorage/service/LocalStorage";
import LocalStorage from "@/features/localStorage/service/LocalStorage";
// constants
import { WEATHER, WEATHER_API_KEY } from "@/constants";

class WeatherModel {
  private static _instance: WeatherModel
  private _weatherFetchService: WeatherFetchService
  private _localStorageService: LocalStorageService
  @observable
  weathers = new Map<string, CurrentWeather>()
  @observable
  isFetching = false
  constructor() {
    makeObservable(this)
    this._weatherFetchService = WeatherFetchService.getInstance()
    this._localStorageService = LocalStorage.getInstance()
  }
  static getInstance(): WeatherModel {
    if(!WeatherModel._instance) {
      WeatherModel._instance = new WeatherModel()
    }
    return WeatherModel._instance;
  }

   getWeather(): void {
    const geoStorage = this._localStorageService.getItem<GeoStorage>(WEATHER)
    if(geoStorage) {
      Object.entries(geoStorage).map( async (geo) => {
        const [city, value] = geo
        this.isFetching = true;
        const response = await this._weatherFetchService.getCurrentWeather({
          lat: value.lat,
          lon: value.lon,
          key: WEATHER_API_KEY
        })
        // for debug
        console.log(response)
        this.weathers.set(city, response);
        this.isFetching = false
      })
    } else {
      throw Error('nothing to fetch')
    }
  }
}
export default WeatherModel