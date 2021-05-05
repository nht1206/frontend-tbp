import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import adminRoutes from "./routes/admin";
import homeRoutes from "./routes/home";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "homePage" */ "../views/Home/HomePage.vue"),
    children: homeRoutes,
  },
  {
    path: "/admin",
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */ "../views/Admin/Dashboard.vue"
      ),
    children: adminRoutes,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
