import {observable} from "mobx";
// types
import {Geo} from '@/features/geo/types/type'

export default class GeoModel {
  private static _instance: GeoModel

  @observable
  public geoData!: Geo[]
  static getInstance(): GeoModel {
    if(!GeoModel._instance) {
      GeoModel._instance = new GeoModel()
    }
    return GeoModel._instance;
  }
}