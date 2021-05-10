import { RouteConfig } from "vue-router";
import MainPage from "@/views/Home/MainPage.vue";
import ProductList from "@/components/Home/Product/ProductList/ProductList.vue";
import ProductDetail from "@/components/Home/Product/ProductDetail/ProductDetail.vue";
import DetailCompare from "@/components/Home/Product/ProductDetailCompare/DetailCompare.vue";

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
  {
    path: "/detail-compare",
    name: "Product detail compare",
    component: DetailCompare,
  },
] as Array<RouteConfig>;
