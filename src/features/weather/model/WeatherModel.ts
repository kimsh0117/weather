// vendor
import {observable, makeObservable} from 'mobx'
// types
import {CurrentWeather} from "@/features/weather/types/type";

class WeatherModel {
  private static _instance: WeatherModel

  @observable
  weathers = new Map<string, CurrentWeather>()
  @observable
  isFetching = false
  constructor() {
    makeObservable(this)
  }
  static getInstance(): WeatherModel {
    if(!WeatherModel._instance) {
      WeatherModel._instance = new WeatherModel()
    }
    return WeatherModel._instance;
  }
}
export default WeatherModel