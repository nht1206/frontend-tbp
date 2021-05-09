import { RouteConfig } from "vue-router";
import Dashboard from "@/views/Admin/Dashboard.vue";
import ListCategory from "@/components/Admin/Category/ListCategory.vue";
import ListGuestAccount from "@/components/Admin/Account/ListGuestAccount.vue";
import ListRetailerAccount from "@/components/Admin/Account/ListRetailerAccount.vue";

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
  {
    path: "/retailer-account",
    component: ListRetailerAccount,
  },
] as Array<RouteConfig>;
