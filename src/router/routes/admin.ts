import { RouteConfig } from "vue-router";
import Dashboard from "@/views/Admin/Dashboard.vue";
import ListCategory from "@/components/Admin/Category/ListCategory.vue";
import ListGuestAccount from "@/components/Admin/Account/ListGuestAccount.vue";
import CreateGuestAccount from "@/components/Admin/Account/CreateAccount.vue";
import EditAccount from "@/components/Admin/Account/EditAccount.vue";
import ListRetailerAccount from "@/components/Admin/Account/ListRetailerAccount.vue";
import ListKeyword from "@/components/Admin/Statistics/KeywordStatistics.vue";
import ProductStatistics from "@/components/Admin/Statistics/ProductStatistics.vue";
import TrafficStatistics from "@/components/Admin/Statistics/TrafficStatistics.vue";

export default [
  {
    path: "/",
    component: Dashboard,
  },
  {
    path: "/danh-muc",
    component: ListCategory,
    meta: {
      title: "Quản lý danh mục",
    },
  },
  {
    path: "/tai-khoan-nguoi-dung",
    component: ListGuestAccount,
    meta: {
      title: "Danh sách tài khoản người dùng",
    },
  },
  {
    path: "/tai-khoan-chu-cua-hang",
    component: ListRetailerAccount,
    meta: {
      title: "Danh sách tài khoản chủ cửa hàng",
    },
  },
  {
    path: "/tao-tai-khoan",
    component: CreateGuestAccount,
    meta: {
      title: "Tạo tài khoản",
    },
  },
  {
    path: "/chinh-sua-tai-khoan/:id",
    component: EditAccount,
    meta: {
      title: "Chỉnh sửa tài khoản",
    },
  },
  {
    path: "/thong-ke-tu-khoa",
    component: ListKeyword,
    meta: {
      title: "Thống kê từ khóa",
    },
  },
  {
    path: "/thong-ke-san-pham",
    component: ProductStatistics,
    meta: {
      title: "Thống kê sản phẩm",
    },
  },
  {
    path: "/thong-ke-luot-truy-cap",
    component: TrafficStatistics,
    meta: {
      title: "Thống kê lượt truy cập",
    },
  },
] as Array<RouteConfig>;
