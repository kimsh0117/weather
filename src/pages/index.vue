<template>
  <div id="app">
    <img alt="Vue logo" src="../assets/logo.png" />
<!--    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />-->
  </div>
</template>

<script lang="ts">
import { Component, Vue  } from "vue-property-decorator";
import HelloWorld from "@/features/ui/HelloWorld.vue";
import { Observer } from "mobx-vue";
import GeoModel from "@/features/geo/model/GeoModel";
@Observer
@Component({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {

  state = new GeoModel()
  mounted() {
    if (!localStorage.weather) {
      this.state.getCoordinates()
      console.log(this.state.geo)
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
