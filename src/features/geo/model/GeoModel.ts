import { makeObservable, observable, action } from 'mobx'
import { Geo } from '@/features/geo/types/type'
import GeoFetchService from '@/features/geo/service/Fetch'
export default class GeoModel {
  _getFetchService: GeoFetchService
  // 여기 셋으로 변경해보자
  @observable geo: {[key: string]: Geo} = {}
  constructor() {
    makeObservable(this)
    this._getFetchService = GeoFetchService.getInstance()
  }
  @action
  getCoordinates() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    const success = async (pos: GeolocationPosition) => {
      const crd = pos.coords;
      const lat = crd.latitude.toString();
      const lng = crd.longitude.toString();
      const geoResponse = await this._getFetchService.getGeo({
        lat,
        lon: lng,
        key: "d378158b3bbc1910e13e55f70017426c"
      })

      geoResponse.forEach(el => {
        if(!this.geo[el.name]) {
          this.geo[el.name] = {
            country:  el.country,
            lat: el.lat,
            lon: el.lon,
            name: el.name,
          }
        }
      })
      // getCity(coordinates);
    }
    const error = (err: GeolocationPositionError) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }
}