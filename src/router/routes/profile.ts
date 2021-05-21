import { RouteConfig } from "vue-router";
import UserInfo from "@/components/Profile/UserInfo.vue";
import UpdateInfo from "@/components/Profile/UpdateInfo.vue";
import ListRetailer from "@/components/Profile/Retailer/ListRetailer.vue";
import CreateRetailer from "@/components/Profile/Retailer/CreateRetailer.vue";
import UpdateRetailer from "@/components/Profile/Retailer/UpdateRetailer.vue";
import ListUserProduct from "@/components/Profile/Product/ListUserProduct.vue";
import ListSystemProduct from "@/components/Profile/Product/ListSystemProduct.vue";
import CreateProduct from "@/components/Profile/Product/CreateProduct.vue";
import UpdateProduct from "@/components/Profile/Product/UpdateProduct.vue";

export default [
  {
    path: "/",
    component: UserInfo,
  },
  {
    path: "/cap-nhat-thong-tin",
    component: UpdateInfo,
    meta: {
      title: "Cập nhật thông tin cá nhân",
    },
  },
  {
    path: "/cua-hang",
    component: ListRetailer,
    meta: {
      title: "Danh sách cửa hàng của bạn",
    },
  },
  {
    path: "/dang-ky-cua-hang",
    component: CreateRetailer,
    meta: {
      title: "Đăng ký cửa hàng mới",
    },
  },
  {
    path: "/chinh-sua-cua-hang/:id",
    component: UpdateRetailer,
    meta: {
      title: "Chỉnh sửa cửa hàng",
    },
  },
  {
    path: "/san-pham-cua-ban",
    component: ListUserProduct,
    meta: {
      title: "Danh sách sản phẩm",
    },
  },
  {
    path: "/san-pham-cua-he-thong",
    component: ListSystemProduct,
    meta: {
      title: "Danh sách sản phẩm của hệ thống",
    },
  },
  {
    path: "/dang-san-pham",
    component: CreateProduct,
    meta: {
      title: "Đăng sản phẩm",
    },
  },
  {
    path: "/cap-nhat-san-pham/:id",
    component: UpdateProduct,
    meta: {
      title: "Cập nhật sản phẩm",
    },
  },
] as Array<RouteConfig>;
