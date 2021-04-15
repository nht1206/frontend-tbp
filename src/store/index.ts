import { category } from "./modules/category";
import { product } from "./modules/product";
import { cart } from "./modules/cart";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    category,
    product,
    cart,
  },
});
