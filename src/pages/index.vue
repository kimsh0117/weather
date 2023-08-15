<template>
  <div id="app">
    <weather-widget></weather-widget>
  </div>
</template>

<script lang="ts">
// vendor
import {Component, Vue} from "vue-property-decorator";
// components
import WeatherWidget from "@/features/weather/components/WeatherWidget.vue";
@Component({
  components: {WeatherWidget},
})
export default class App extends Vue {}
</script>

<style lang="scss">
  #app {
    height: 100%;
  }
</style>

