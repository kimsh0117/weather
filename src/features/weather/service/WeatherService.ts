import {makeObservable, action, runInAction} from 'mobx'
// model
import WeatherModel from "@/features/weather/model/WeatherModel";
// import GeoModel from "@/features/geo/model/GeoModel";
// services
import WeatherFetchService from "@/features/weather/service/WeatherFetchService";
import LocalStorageService from "@/features/localStorage/service/LocalStorage";
// types
import {CurrentWeather} from "@/features/weather/types/type";
import {Geo} from "@/features/geo/types/type";
// constants
import {WEATHER} from "@/constants";

class WeatherService {
  private _weatherModel: WeatherModel
  // private _geoModel: GeoModel

  private _weatherFetchService: WeatherFetchService
  private _localStorageService: LocalStorageService

  private static _instance: WeatherService
  constructor() {
    makeObservable(this)
    this._weatherModel = WeatherModel.getInstance()
    // this._geoModel = GeoModel.getInstance()

    this._weatherFetchService = WeatherFetchService.getInstance()
    this._localStorageService = LocalStorageService.getInstance()
  }
  static getInstance(): WeatherService {
    if(!WeatherService._instance) {
      WeatherService._instance = new WeatherService()
    }
    return WeatherService._instance;
  }
  getIconUrl(id: string, url: string): string {
    return `${url}${id}@2x.png`
  }
  convertVisibility(visibility: number): string {
    return (visibility / 1000).toFixed(1) + 'km'
  }
  rotateDeg(deg: number) {
    return `rotate(${deg}deg)`
  }
  async search(city: string): Promise<CurrentWeather> {
    return await this._weatherFetchService.getCurrentWeatherByCityName({name: city})
  }
  @action
  async getWeather() {
    const geoStorage = this._localStorageService.getItem<Geo[]>(WEATHER)
    if(geoStorage) {
      const promises = geoStorage.map( async (geo) => {
        return await this._weatherFetchService.getCurrentWeatherByCityName({
          name: geo.name
        })
      })
      const results = await Promise.all(promises);
      results.forEach(data => {
        runInAction(() => {
          this._weatherModel.weathers.set(data.name, data);
        })
      })

    } else {
      throw Error('nothing to fetch')
    }
  }

  @action
  swapAandB(aIndex: number, bIndex: number): void {
    console.log(aIndex, bIndex)
    const reordered = [...this._weatherModel.weathers.entries()]
    // console.log('before', reordered)
    this._weatherModel.weathers.clear()

    const temp = reordered[bIndex]
    reordered[bIndex] = reordered[aIndex]
    reordered[aIndex] = temp
    console.log(reordered)
    // console.log('after', reordered)
    reordered.forEach(([city, values]) => {
      this._weatherModel.weathers.set(city, values);
    })
  }
}

export default WeatherService