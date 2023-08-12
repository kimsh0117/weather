<script lang="ts">
// vendor
import { Vue, Component  } from 'vue-property-decorator';

@Component({})
export default class WeatherProvider extends Vue {
  private clicked = false
  get state() {
    return {
      clicked: this.clicked
    }
  }
  get actions() {
    return {
      click: this.click
    }
  }
  click() {
    this.clicked = !this.clicked
  }
}
</script>

<template>
  <div class="weather-container">
    <slot v-bind="{state, actions}"/>
  </div>
</template>

<style scoped lang="scss">
  .weather-container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>