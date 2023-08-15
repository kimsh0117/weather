import Vue from "vue";
import WeatherWidget from "./WeatherWidget.vue";

const Components = {
  WeatherWidget,
};

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name]);
});

export default Components;
