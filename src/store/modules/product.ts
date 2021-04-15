import { ProductState, RootState } from "./../types";
import { Module } from "vuex";
import Product from "@/models/product";
import productService from "@/service/product-service";
import Option from "@/models/option";

const state: ProductState = {
  products: [] as Product[],
  selectedProduct: null,
  currentOption: {},
  isLoading: false,
};

const namespaced = true;

export const product: Module<ProductState, RootState> = {
  state,
  mutations: {
    setProducts: (state, products: Product[]) => {
      state.products = products;
    },
    setSelectedProduct: (state, product: Product) => {
      state.selectedProduct = product;
    },
    setCurrentOption: (state, option: Option) => {
      state.currentOption = option;
    },
    setLoading: (state, isLoading: boolean) => {
      state.isLoading = isLoading;
    },
  },
  actions: {
    searchProducts: (
      { commit },
      option: Option = {
        keyword: "",
        catId: null,
      }
    ) => {
      commit("setLoading", true);
      productService.searchProduct(option).then((res) => {
        commit("setProducts", res.data.content);
        commit("setCurrentOption", option);
        commit("setLoading", false);
      });
    },
  },
  getters: {
    products: (state) => state.products,
    selectedProduct: (state) => state.selectedProduct,
    currentOption: (state) => state.currentOption,
    isLoading: (state) => state.isLoading,
  },
  namespaced,
};
