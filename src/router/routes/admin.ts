import { RouteConfig } from "vue-router";
import Dashboard from "@/views/Admin/Dashboard.vue";
import ListCategory from "@/components/Admin/Category/ListCategory.vue";

export default [
  {
    path: "/",
    component: Dashboard,
  },
  {
    path: "/category",
    component: ListCategory,
  },
] as Array<RouteConfig>;
