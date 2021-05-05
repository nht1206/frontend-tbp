import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue } from "bootstrap-vue";
import vueDebounce from "vue-debounce";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./assets/styles/app.scss";
import clickOutside from "./directives/click-outside";

Vue.use(BootstrapVue);

Vue.use(vueDebounce, {
  listenTo: ["input", "keyup"],
});

Vue.directive("click-outside", clickOutside);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
