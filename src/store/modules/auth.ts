import authService, { LoginPayload } from "@/service/auth-service";
import storageService from "@/service/storage-service";
import { Module } from "vuex";
import { AuthState, RootState } from "../types";
import router from "@/router";
export const state: AuthState = {
  user: null,
  error: null,
  isLoading: false,
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
    setLoading: (state, isLoading: boolean) => {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async login({ commit, state }, payload: LoginPayload) {
      commit("setLoading", true);
      try {
        const res = await authService.login(payload);
        storageService.saveToken(res.data.accessToken);
        const user = storageService.extractUser();
        if (user) {
          if (user?.role === "ROLE_ADMIN") {
            if (router.currentRoute.path === "/login") router.push("/admin");
          } else {
            if (router.currentRoute.path === "/login") router.push("/");
          }
          state.user = user;
          commit("setLoading", false);
        }
      } catch (error) {
        commit("setError", error.response.data.message);
        commit("setLoading", false);
      }
    },
    async logout({ commit, getters }) {
      commit("setLoading", true);
      try {
        const user = getters.user;
        await authService.logout();
        storageService.removeToken();
        if (user.role === "ROLE_ADMIN") {
          if (router.currentRoute.matched[0].path === "/admin")
            router.push("/login");
          else {
            router.push("/");
          }
        } else {
          router.push("/");
        }
        commit("setLoading", false);
        commit("loadUser");
      } catch (err) {
        commit("setLoading", false);
        commit("setError", err.response.data.message);
      }
    },
  },
  getters: {
    user: (state) => state.user,
    error: (state) => state.error,
    isLoading: (state) => state.isLoading,
  },
  namespaced,
};
