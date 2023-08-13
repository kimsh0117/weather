// types
import { GeoStorage } from '@/features/geo/types/type'
// services
import GeoFetchService from '@/features/geo/service/GeoFetchService'
import LocalStorage from "@/features/localStorage/service/LocalStorage";
// constants
import { WEATHER, WEATHER_API_KEY } from "@/constants";
// models
import WeatherModel from "@/features/weather/model/WeatherModel";

export default class GeoModel {
  private static _instance: GeoModel
  private _geoFetchService: GeoFetchService
  private _localStorageService: LocalStorage
  private _weatherModel: WeatherModel
  constructor() {
    this._geoFetchService = GeoFetchService.getInstance()
    this._localStorageService = LocalStorage.getInstance()
    this._weatherModel = WeatherModel.getInstance()
  }
  static getInstance(): GeoModel {
    if(!GeoModel._instance) {
      GeoModel._instance = new GeoModel()
    }
    return GeoModel._instance;
  }
  async initCoordinates() {
    if (!this._localStorageService.getItem<GeoStorage>(WEATHER)) {

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
            const newItem = {
              [el.name]: {
                country:  el.country,
                lat: el.lat,
                lon: el.lon,
                name: el.name,
              }}
            this._localStorageService.setItem<GeoStorage>(WEATHER, newItem)
          })
          this._weatherModel.getWeather()
        } catch(err) {
          throw Error('failed geo fetch')
        }
      }
      const error = (err: GeolocationPositionError) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
      this._weatherModel.getWeather()
    }
  }
}