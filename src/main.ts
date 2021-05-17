import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue } from "bootstrap-vue";
import vueDebounce from "vue-debounce";
import VueCompositionAPI from "@vue/composition-api";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./assets/styles/app.scss";
import clickOutside from "./directives/click-outside";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel";

Vue.use(BootstrapVue);
Vue.use(VueCompositionAPI);

Vue.use(vueDebounce, {
  listenTo: ["input", "keyup"],
});

Vue.directive("click-outside", clickOutside);

Vue.config.productionTip = false;

declare module "vue" {
  // eslint-disable-next-line
  interface ComponentOptions<V> {
    validations?: any;
  }
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
