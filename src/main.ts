// vendor
import Vue from "vue";
// global styles
import "@/styles/reset.scss";
import "@/styles/normalize.scss";
import "@/styles/index.scss";
// app
import App from "@/pages/index.vue";

new Vue({
  render: (h) => h(App),
}).$mount("#app");
