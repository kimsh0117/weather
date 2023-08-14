import {action, makeObservable, observable} from "mobx";
// model
import GeoModel from "@/features/geo/model/GeoModel";
import WeatherModel from "@/features/weather/model/WeatherModel";
// types
import {Geo} from "@/features/geo/types/type";
// constants
import {WEATHER, WEATHER_API_KEY} from "@/constants";
// services
import GeoFetchService from '@/features/geo/service/GeoFetchService'
import LocalStorage from "@/features/localStorage/service/LocalStorage";
import WeatherService from "@/features/weather/service/WeatherService";
class GeoService {
  private static _instance: GeoService

  private _geoModel: GeoModel
  private _weatherModel: WeatherModel

  private _geoFetchService: GeoFetchService
  private _localStorageService: LocalStorage
  private _weatherService: WeatherService
  constructor() {
    makeObservable(this)
    this._geoModel = GeoModel.getInstance()
    this._weatherModel = WeatherModel.getInstance()

    this._geoFetchService = GeoFetchService.getInstance()
    this._localStorageService = LocalStorage.getInstance()
    this._weatherService = WeatherService.getInstance()
  }
  static getInstance(): GeoService {
    if(!GeoService._instance) {
      GeoService._instance = new GeoService()
    }
    return GeoService._instance;
  }

  @action
  async initCoordinates() {
    const storage = this._localStorageService.getItem<Geo[]>(WEATHER)

    if (!storage || storage.length === 0) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
      const success = async (pos: GeolocationPosition) => {
        const crd = pos.coords;
        const lat = crd.latitude.toString();
        const lng = crd.longitude.toString();
        try {
          const geoResponse = await this._geoFetchService.getGeo({
            lat,
            lon: lng,
            key: WEATHER_API_KEY
          })
          geoResponse.forEach(el => {
            const newItem = [{
              country:  el.country,
              lat: el.lat,
              lon: el.lon,
              name: el.name,
            }]

            this._localStorageService.setItem<Geo[]>(WEATHER, newItem)
            this.updateGeoData(newItem)
          })
          await this._weatherService.getWeather()
        } catch(err) {
          throw Error('failed geo fetch')
        }
      }
      const error = (err: GeolocationPositionError) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
      this.updateGeoData(storage)
      await this._weatherService.getWeather()
    }
  }
  @action
  async remove(city: string) {
    const updated = this._geoModel.geoData.filter(geo => geo.name !== city)
    this._localStorageService.setItem(WEATHER, updated)
    this.updateGeoData(updated)
    this._weatherModel.weathers.delete(city)
  }

  @action
  updateGeoData(data: Geo[]): void {
    this._geoModel.geoData = data
  }
}

export default GeoService