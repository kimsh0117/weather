export type Coordinates = {
  lon: number
  lat: number
}
export type Weather = {
  id: number
  main: string
  description: string
  icon: string
}
export type Main = {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
  sea_level: number
  grnd_level: number
}
export type Wind = {
  speed: number
  deg: number
  gust: number
}
export type Rain = {
  '1h': number
}
export type Clouds = {
  all: number
}
export type System = {
  type: number
  id: number
  country: string
  sunrise: number
  sunset: number
  city: string
}
export type CurrentWeather = {
  coord: Coordinates
  weather: Weather[]
  base: string
  main: Main
  visibility: number
  wind: Wind
  rain: Rain
  clouds: Clouds
  dt: number
  sys: System
  timezone: number
  id: number
  name: string
  cod: number
}

export type WeatherForm = {
  cityName: string,
  cityNameErrMsg: string,
}