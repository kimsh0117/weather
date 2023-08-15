<script lang="ts">
// vendor
import 'reflect-metadata'
import {Vue,Component,Prop} from 'vue-property-decorator';
import {Observer} from "mobx-vue";
// models
import WeatherModel from "@/features/weather/model/WeatherModel";
// components
import SettingIcon from '@/assets/icons/icon-setting.svg';
import NavigationIcon from '@/assets/icons/icon-navigation.svg';
// constants
import {WEATHER_ICON_URL} from "@/constants";
// service
import WeatherService from "@/features/weather/service/WeatherService";
@Observer
@Component({
  components: {
    SettingIcon,
    NavigationIcon
  },
})
export default class Weather extends Vue {
  @Prop()
  private state!: { clicked: boolean }

  @Prop()
  private actions!: { click: object }

  weatherModel = WeatherModel.getInstance()
  weathers = this.weatherModel.weathers

  private weatherService: WeatherService =  WeatherService.getInstance()
  getIconUrl(id: string) {
    return this.weatherService.getIconUrl(id, WEATHER_ICON_URL)
  }
  convertVisibility(visibility: number) {
    return this.weatherService.convertVisibility(visibility)
  }
  rotateDeg(deg: number) {
    return this.weatherService.rotateDeg(deg)
  }
}
</script>

<template>
  <div v-if="!state.clicked">
    <div class="weather" v-for="([city, values], index) in weathers" v-bind:key="city">
      <div class="weather__header">
        <div>{{values.name}}, {{values.sys.country}}</div>
        <button v-if="index === 0" v-on:click="actions.click" class="btn">
          <setting-icon />
        </button>
      </div>
      <div class="weather__temp">
        <img :src="getIconUrl(values.weather[0].icon)" :alt="values.weather[0].description">
        <h3>{{values.main.temp}} &#8451;</h3>
      </div>
      <div class="weather__description">
        <p>Feels like {{values.main.feels_like}} &#8451;.</p>
        <p v-for="(weather) in values.weather" v-bind:key="weather.description">
          {{weather.description}}
        </p>
      </div>
      <div class="weather__wind">
        <span class="weather__wind__deg" :style="{transform: rotateDeg(values.wind.deg)}">
          <navigation-icon />
        </span>
        <span class="weather__wind__speed">{{values.wind.speed}} m/s</span>
      </div>
      <div class="weather__others">
        <span class="weather__others__humidity">Humidity: {{values.main.humidity}}% </span>
        <span class="weather__others__visibility">Visibility: {{convertVisibility(values.visibility)}}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .weather {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 250px;
    &:not(:last-child) {
      margin-bottom: 50px;
    }
  }
  .weather__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 500;
  }
  .weather__temp {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
  }
  .weather__description {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;

    p::first-letter {
      text-transform: uppercase;
    }
  }
  .weather__wind {
    display: flex;
    align-items: center;
    padding: 10px 0;
    &__speed {
      margin-left: 3px;
    }
  }
  .weather__others {
    display: flex;
    justify-content: space-between;
  }
</style>