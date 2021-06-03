import { Module } from "vuex";
import { RootState, ToastState } from "../types";
export const state: ToastState = {
  toastInfo: {
    message: "",
    title: "",
    variant: "default",
  },
};
const namespaced = true;
export const toast: Module<ToastState, RootState> = {
  state,
  mutations: {
    setToastInfo(state, toastInfo) {
      state.toastInfo = toastInfo;
    },
  },
  actions: {},
  getters: {
    toastInfo: (state) => state.toastInfo,
  },
  namespaced,
};
