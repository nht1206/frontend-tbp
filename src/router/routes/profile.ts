import { RouteConfig } from "vue-router";
import UserInfo from "@/components/Profile/UserInfo.vue";
import UpdateInfo from "@/components/Profile/UpdateInfo.vue";
import ListRetailer from "@/components/Profile/Retailer/ListRetailer.vue";
import CreateRetailer from "@/components/Profile/Retailer/CreateRetailer.vue";
import UpdateRetailer from "@/components/Profile/Retailer/UpdateRetailer.vue";

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
] as Array<RouteConfig>;
