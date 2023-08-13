import { CurrentWeather } from "@/features/weather/types/type";
import { weatherApi } from "@/features/http/service";

class WeatherFetchService {
  private static _instance: WeatherFetchService
  static getInstance(): WeatherFetchService {
    if(!WeatherFetchService._instance) {
      WeatherFetchService._instance = new WeatherFetchService()
    }
    return WeatherFetchService._instance;
  }
  public getCurrentWeather({lat, lon, key, units = 'metric'}:  { lat: number; lon: number, key: string, units?: string}): Promise<CurrentWeather> {
    return weatherApi
        .get(`/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=${units}`)
        .then(res => res.data)
  }
}

export default WeatherFetchService