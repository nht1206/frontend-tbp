import { RouteConfig } from "vue-router";
import Dashboard from "@/views/Admin/Dashboard.vue";

export default [
  {
    path: "/",
    component: Dashboard,
  },
] as Array<RouteConfig>;
