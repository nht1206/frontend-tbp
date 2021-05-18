import { RouteConfig } from "vue-router";
import UserInfo from "@/components/Profile/UserInfo.vue";

export default [
  {
    path: "/",
    component: UserInfo,
  },
] as Array<RouteConfig>;
