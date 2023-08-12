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
import { Component, Vue  } from "vue-property-decorator";
import { Observer } from "mobx-vue";
// components
import WeatherProvider from "@/features/weather/components/WeatherProvider.vue";
import Weather from "@/features/weather/components/Weather.vue";
import WeatherSettings from "@/features/weather/components/WeatherSettings.vue";
// models
import GeoModel from "@/features/geo/model/GeoModel";

@Observer
@Component({
  components: {
    WeatherProvider,
    Weather,
    WeatherSettings
  },
})
export default class App extends Vue {
  geoModel = GeoModel.getInstance()
  mounted() {
    this.geoModel.initCoordinates()
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

