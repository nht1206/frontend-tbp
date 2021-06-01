import authService from "@/service/auth-service";
import storageService from "@/service/storage-service";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import adminRoutes from "./routes/admin";
import homeRoutes from "./routes/home";
import profileRoutes from "./routes/profile";
import EmailConfirm from "@/views/EmailConfirm.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "homePage" */ "../views/Home/HomePage.vue"),
    children: homeRoutes,
  },
  {
    path: "/tai-khoan",
    component: () =>
      import(
        /* webpackChunkName: "profilePage" */ "../views/Profile/ProfilePage.vue"
      ),
    children: profileRoutes,
    beforeEnter: (to, from, next) => {
      authService
        .validateToken()
        .then(() => {
          store.commit("auth/loadUser");
          const user = storageService.extractUser();
          if (user) {
            next();
          } else {
            store.dispatch("auth/logout");
            next({ path: "/" });
          }
        })
        .catch(() => {
          store.dispatch("auth/logout");
          next({ path: "/" });
        });
    },
  },
  {
    path: "/admin",
    component: () =>
      import(
        /* webpackChunkName: "adminPage" */ "../views/Admin/AdminPage.vue"
      ),
    children: adminRoutes,
    beforeEnter: (to, from, next) => {
      authService
        .validateToken()
        .then(() => {
          store.commit("auth/loadUser");
          const user = storageService.extractUser();
          if (user) {
            if (user?.role === "ROLE_ADMIN") {
              next();
            } else {
              store.dispatch("auth/logout");
              next({ path: "/" });
            }
          }
          next();
        })
        .catch(() => {
          store.dispatch("auth/logout");
          next({ path: "/login" });
        });
    },
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginAdmin.vue"),
    beforeEnter: (to, from, next) => {
      const token = storageService.getToken();
      if (token) {
        next({ path: from.path });
      } else {
        next();
      }
    },
  },
  {
    path: "/xac-nhan-email",
    component: EmailConfirm,
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

const DEFAULT_TITLE = "The best price, Hệ thống so sánh giá";
router.afterEach((to, from) => {
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
  });
});

export default router;
