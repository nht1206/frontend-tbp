import { Module } from "vuex";
import { RootState, SearchState } from "../types";
export const state: SearchState = {
  keyword: "",
};
const namespaced = true;
export const search: Module<SearchState, RootState> = {
  state,
  mutations: {
    clear(state) {
      state.keyword = "";
    },
    setKeyword(state, keyword: string) {
      state.keyword = keyword;
    },
  },
  actions: {},
  getters: {
    keyword: (state) => state.keyword,
  },
  namespaced,
};
