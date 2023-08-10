import axios from 'axios'
import { Geo } from "@/features/geo/types/type";

class GeoFetchService {
  private static _instance: GeoFetchService
  static getInstance(): GeoFetchService {
    if(!GeoFetchService._instance) {
      GeoFetchService._instance = new GeoFetchService()
    }
    return GeoFetchService._instance;
  }
  public getGeo({lat, lon, key, limit = 10}:  { lat: string; lon: string, key: string, limit?: number}) : Promise<Geo[]>{
    return axios
        .get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${key}`)
        .then(res => res.data)
  }
}

export default GeoFetchService