<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
// components
import WeatherProvider from "@/features/weather/components/WeatherProvider.vue";
import Weather from "@/features/weather/components/Weather.vue";
import WeatherSettings from "@/features/weather/components/WeatherSettings.vue";
// services
import GeoService from "@/features/geo/service/GeoService";
@Component({
  components: {WeatherSettings, Weather, WeatherProvider},
})
export default class WeatherWidget extends Vue {
  geoService = GeoService.getInstance()

  mounted() {
    this.geoService.initCoordinates()
  }
}
</script>

<template>
  <weather-provider v-slot="{state, actions}">
    <weather v-bind="{state, actions}" />
    <weather-settings v-bind="{state, actions}" />
  </weather-provider>
</template>

<style scoped lang="scss">

</style>