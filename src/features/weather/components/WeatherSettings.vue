<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import {Observer} from "mobx-vue";
// components
import XIcon from '@/assets/icons/icon-x.svg';
@Observer
@Component({
  components: {
    XIcon
  }
})
export default class WeatherSettings extends Vue {
  @Prop()
  private state!: { clicked: boolean }

  @Prop()
  private actions!: { click: object }
}
</script>

<template>
  <div v-if="state.clicked" class="weather-settings">
    <div class="weather-settings__header">
      <div>setting</div>
      <button v-on:click.stop="actions.click"><x-icon /></button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.weather-settings {}
.weather-settings__header {
  display: flex;
  justify-content: space-between;
}
</style>