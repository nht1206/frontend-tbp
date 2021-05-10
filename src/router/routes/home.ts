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
    path: "/danh-sach-san-pham",
    name: "Product list",
    component: ProductList,
    meta: {
      title: "Danh sách sản phẩm",
    },
  },
  {
    path: "/chi-tiet-san-pham/:id",
    name: "Product detail",
    component: ProductDetail,
    meta: {
      title: "Chi tiết sản phẩm",
    },
  },
  {
    path: "/so-sanh-chi-tiet",
    name: "Product detail compare",
    component: DetailCompare,
    meta: {
      title: "So sánh chi tiết",
    },
  },
] as Array<RouteConfig>;
