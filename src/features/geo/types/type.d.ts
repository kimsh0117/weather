export type Geo = {
  country:  string
  lat: number
  lon: number
  name: string
}

export type GeoStorage = {
  [city: string]: Geo
}