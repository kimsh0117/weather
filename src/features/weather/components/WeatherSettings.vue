<script lang="ts">
import 'reflect-metadata'
import {Vue, Component, Prop} from 'vue-property-decorator';
import {Observer} from "mobx-vue";
import {AxiosError} from "axios";
import {action} from "mobx";
import draggable from "vuedraggable";
// components
import XIcon from '@/assets/icons/icon-x.svg';
import MenuIcon from '@/assets/icons/icon-menu.svg';
import TrashIcon from '@/assets/icons/icon-trash.svg';
import SearchIcon from '@/assets/icons/icon-search.svg';
// model
import GeoModel from "@/features/geo/model/GeoModel";
// service
import WeatherService from "@/features/weather/service/WeatherService";
import FormService from "@/features/form/service/FormService";
import LocalStorageService from "@/features/localStorage/service/LocalStorage";
import GeoService from "@/features/geo/service/GeoService";
// types
import {WeatherForm} from "@/features/weather/types/type";
import {Geo} from "@/features/geo/types/type";
// constants
import {WEATHER} from "@/constants";

const initialFormValues = {
  cityName: "",
  cityNameErrMsg: "",
}
@Observer
@Component({
  components: {
    XIcon,
    MenuIcon,
    TrashIcon,
    SearchIcon,
    draggable
  }
})
export default class WeatherSettings extends Vue {
  @Prop()
  private state!: { clicked: boolean }

  @Prop()
  private actions!: { click: object }

  private geoModel = GeoModel.getInstance()

  private geoService = GeoService.getInstance()
  private weatherService = WeatherService.getInstance()
  private formService = new FormService<WeatherForm>(initialFormValues)
  private localStorageService = LocalStorageService.getInstance()

  @action
  remove(city: string) {
    this.geoService.remove(city)
  }

  @action
  async search(data: WeatherForm) {
    try {
      const res = await this.weatherService.search(data.cityName)
      const currentStorage = this.localStorageService.getItem<Geo[]>(WEATHER)

      if(currentStorage) {
        const newGeoItem: Geo = {
          country: res.sys.country,
          lat: res.coord.lat,
          lon: res.coord.lon,
          name: res.name
        }
        const updatedStorage = [...currentStorage, newGeoItem]
        // 1. update localStorage
        this.localStorageService.setItem<Geo[]>(WEATHER, updatedStorage)
        // 2. update models
        this.geoModel.geoData = updatedStorage
        await this.weatherService.getWeather()
      }
      // clear input data
      this.formService.setFormState(initialFormValues)
    } catch(e) {
      const err = e as AxiosError<{cod: string, message: string}>
      if(err.response?.data.cod === '404') {
          const updated = {
            ...data,
            cityNameErrMsg: err.response?.data.message
          }
          this.formService.setFormState(updated)
      }
    }
  }

  @action
  handleDrag(event: any) {
    this.localStorageService.setItem<Geo[]>(WEATHER, this.geoModel.geoData)
    this.weatherService.swapAandB(event.moved.newIndex, event.moved.oldIndex)
  }
}
</script>

<template>
  <div v-if="state.clicked && geoModel.geoData" class="weather-settings">
    <div class="weather-settings__header">
      <div>setting</div>
      <button v-on:click.stop="actions.click" class="btn"><x-icon /></button>
    </div>

    <draggable tag="ul" v-model="geoModel.geoData" class="weather-settings__list" handle=".menu" @change="handleDrag">
      <li v-for="(value) in geoModel.geoData" :key="value.name" class="weather-settings__list__item">
        <button class="btn menu"><menu-icon /></button>
        <div class="weather-settings__list__item__text">{{value.name}}, {{value.country}}</div>
        <button class="btn weather-settings__list__item__remove" v-on:click.stop="remove(value.name)"><trash-icon /></button>
      </li>
    </draggable>

    <form class="weather-settings__search" @submit.prevent="formService.handleSubmit(search)">
      <label for="city" class="weather-settings__search__label">Add location:</label>
      <div class="weather-settings__search__container">
        <input type="text" id="city" placeholder="please enter city name" :value="formService.formState.cityName" @input="formService.formState.cityName = $event.target.value">
        <button class="btn" type="submit"><search-icon /></button>
      </div>
      <div class="weather-settings__search__error" v-if="formService.formState.cityNameErrMsg">{{formService.formState.cityNameErrMsg}}</div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.weather-settings {
  width: 250px;
  display: flex;
  flex-direction: column;
}
.weather-settings__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  text-transform: capitalize;
}
.weather-settings__list {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.weather-settings__list__item {
  background: #edebe9;
  padding: 15px 10px;
  display: flex;
  align-items: center;
  font-size: 14px;
}
.weather-settings__list__item__text {
  margin-left: 10px;
}
.weather-settings__list__item__remove {
  margin-left: auto;
}
.weather-settings__search {
  margin-top: 40px;
}
.weather-settings__search__label {
  font-weight: 500;
}
.weather-settings__search__container {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.weather-settings__search__error {
  margin-top: 5px;
  color: red;
}
</style>