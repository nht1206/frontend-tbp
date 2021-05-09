import { RouteConfig } from "vue-router";
import Dashboard from "@/views/Admin/Dashboard.vue";
import ListCategory from "@/components/Admin/Category/ListCategory.vue";
import ListGuestAccount from "@/components/Admin/Account/ListGuestAccount.vue";

export default [
  {
    path: "/",
    component: Dashboard,
  },
  {
    path: "/category",
    component: ListCategory,
  },
  {
    path: "/guest-account",
    component: ListGuestAccount,
  },
] as Array<RouteConfig>;
