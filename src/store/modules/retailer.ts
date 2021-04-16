import { RootState } from "./../types";
import { Module } from "vuex";
import { RetailerState } from "../types";
import retailerService from "@/service/retailer-service";
import Retailer from "@/models/retailer";

export const state: RetailerState = {
  retailers: [],
};

const namespaced = true;
export const retailer: Module<RetailerState, RootState> = {
  state,
  mutations: {
    setRetailers: (state, retailers: Retailer[]) => {
      state.retailers = retailers;
    },
  },
  actions: {
    loadRetailers: ({ commit }) => {
      retailerService.getRetailers().then((res) => {
        commit("setRetailers", res.data);
      });
    },
  },
  getters: {
    retailers: (state) => state.retailers,
  },
  namespaced,
};
