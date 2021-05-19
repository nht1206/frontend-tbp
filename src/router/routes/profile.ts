import { RouteConfig } from "vue-router";
import UserInfo from "@/components/Profile/UserInfo.vue";
import UpdateInfo from "@/components/Profile/UpdateInfo.vue";

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
] as Array<RouteConfig>;
