import { RouteConfig } from "vue-router";
import MainPage from "@/views/Home/MainPage.vue";
import ProductList from "@/components/Product/ProductList.vue";
import ProductDetail from "@/components/Product/ProductDetail/ProductDetail.vue";

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
  {
    path: "/product-detail/:id",
    name: "Product detail",
    component: ProductDetail,
  },
] as Array<RouteConfig>;
