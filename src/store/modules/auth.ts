import authService, { LoginPayload } from "@/service/auth-service";
import storageService from "@/service/storage-service";
import { Module } from "vuex";
import { AuthState, RootState } from "../types";
import jwt_decode from "jwt-decode";
import User from "@/models/User";
export const state: AuthState = {
  user: null,
  error: null,
};
const namespaced = true;
export const auth: Module<AuthState, RootState> = {
  state,
  mutations: {
    loadUser: (state) => {
      const token = storageService.getToken();
      if (token) {
        const user = jwt_decode<User | null>(token);
        state.user = user;
      } else {
        state.user = null;
      }
    },
    setError: (state, err: Error | null) => {
      state.error = err;
    },
  },
  actions: {
    async login({ commit }, payload: LoginPayload) {
      try {
        const res = await authService.login(payload);
        storageService.saveToken(res.data.accessToken);
        commit("loadUser");
      } catch (error) {
        commit("setError", error.response.data.message);
      }
    },
  },
  getters: {
    user: (state) => state.user,
    error: (state) => state.error,
  },
  namespaced,
};
