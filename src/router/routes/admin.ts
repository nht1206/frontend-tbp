import { RouteConfig } from "vue-router";
import Dashboard from "@/views/Admin/Dashboard.vue";
import Test from "@/views/Admin/Test.vue";

export default [
  {
    path: "/",
    component: Dashboard,
  },
  {
    path: "/test-chart",
    component: Test,
  },
] as Array<RouteConfig>;
