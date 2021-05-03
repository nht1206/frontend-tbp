import Product from "@/models/Product";
import { Module } from "vuex";
import { CartState, RootState } from "../types";
export const state: CartState = {
  cart: [],
};
const namespaced = true;
export const cart: Module<CartState, RootState> = {
  state,
  mutations: {
    addToCart(state, product: Product) {
      state.cart.push(product);
    },
    removeProduct(state, id: number) {
      state.cart = state.cart.filter((p: Product) => p.id !== id);
    },
    clear(state) {
      state.cart = [];
    },
  },
  actions: {},
  getters: {
    cart: (state) => state.cart,
  },
  namespaced,
};
