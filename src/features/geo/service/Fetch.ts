import { Geo } from "@/features/geo/types/type";
import { weatherApi } from "@/features/http/service";

class GeoFetchService {
  private static _instance: GeoFetchService
  static getInstance(): GeoFetchService {
    if(!GeoFetchService._instance) {
      GeoFetchService._instance = new GeoFetchService()
    }
    return GeoFetchService._instance;
  }
  public getGeo({lat, lon, key, limit = 10}:  { lat: string; lon: string, key: string, limit?: number}) : Promise<Geo[]>{
    return weatherApi
        .get(`/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${key}`)
        .then(res => res.data)
  }
}

export default GeoFetchService