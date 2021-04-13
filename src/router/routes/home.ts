import { RouteConfig } from "vue-router";
import MainPage from "@/views/Home/MainPage.vue";
import ProductList from "@/components/Product/ProductList.vue";

export default [
  {
    path: "/",
    name: "Main home",
    component: MainPage,
  },
  {
    path: "/product-list",
    name: "Product list",
    component: ProductList,
  },
] as Array<RouteConfig>;
