import authService, { LoginPayload } from "@/service/auth-service";
import storageService from "@/service/storage-service";
import { Module } from "vuex";
import { AuthState, RootState } from "../types";
import router from "@/router";
export const state: AuthState = {
  user: null,
  error: null,
};
const namespaced = true;
export const auth: Module<AuthState, RootState> = {
  state,
  mutations: {
    loadUser: (state) => {
      const user = storageService.extractUser();
      state.user = user;
    },
    setError: (state, err: Error | null) => {
      state.error = err;
    },
  },
  actions: {
    async login({ commit, state }, payload: LoginPayload) {
      try {
        const res = await authService.login(payload);
        storageService.saveToken(res.data.accessToken);
        const user = storageService.extractUser();
        if (user) {
          if (user?.role === "ROLE_ADMIN") {
            if (router.currentRoute.path === "/login") router.push("/admin");
          }
          state.user = user;
        }
      } catch (error) {
        commit("setError", error.response.data.message);
      }
    },
    async logout({ commit, getters }) {
      try {
        const user = getters.user;
        await authService.logout();
        storageService.removeToken();
        if (user.role === "ROLE_ADMIN") {
          if (router.currentRoute.path === "/admin") router.push("/login");
        } else {
          router.push("/");
        }
        commit("loadUser");
      } catch (err) {
        commit("setError", err.response.data.message);
      }
    },
  },
  getters: {
    user: (state) => state.user,
    error: (state) => state.error,
  },
  namespaced,
};
