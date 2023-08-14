<template>
  <div id="app">
    <weather-provider v-slot="{state, actions}">
      <weather v-bind="{state, actions}" />
      <weather-settings v-bind="{state, actions}" />
    </weather-provider>
  </div>
</template>

<script lang="ts">
// vendor
import {Component, Vue} from "vue-property-decorator";
import {Observer} from "mobx-vue";
// components
import WeatherProvider from "@/features/weather/components/WeatherProvider.vue";
import Weather from "@/features/weather/components/Weather.vue";
import WeatherSettings from "@/features/weather/components/WeatherSettings.vue";
// services
import GeoService from "@/features/geo/service/GeoService";

@Observer
@Component({
  components: {
    WeatherProvider,
    Weather,
    WeatherSettings
  },
})
export default class App extends Vue {
  geoService = GeoService.getInstance()
  mounted() {
    this.geoService.initCoordinates()
  }
}
</script>

<style lang="scss">
  #app {
    font-family: 'Montserrat', Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
  }
</style>

