import { CurrentWeather } from "@/features/weather/types/type";
import { weatherApi } from "@/features/http/service";
// constants
import { WEATHER_API_KEY } from "@/constants";

class WeatherFetchService {
  private static _instance: WeatherFetchService
  static getInstance(): WeatherFetchService {
    if(!WeatherFetchService._instance) {
      WeatherFetchService._instance = new WeatherFetchService()
    }
    return WeatherFetchService._instance;
  }
  public getCurrentWeather({lat, lon, units = 'metric'}:  { lat: number; lon: number, units?: string}): Promise<CurrentWeather> {
    return weatherApi
        .get(`/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=${units}`)
        .then(res => res.data)
  }
  public getCurrentWeatherByCityName({name}: { name: string}): Promise<CurrentWeather> {
    return weatherApi
        .get(`/data/2.5/weather?q=${name}&appid=${WEATHER_API_KEY}&units=metric`)
        .then(res => res.data)
  }
}

export default WeatherFetchService