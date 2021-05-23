import { ProductState, RootState } from "./../types";
import { Module } from "vuex";
import Product from "@/models/Product";
import productService from "@/service/product-service";
import Option from "@/models/Option";
import Page from "@/models/Page";

const state: ProductState = {
  products: {
    content: [],
    number: 0,
    numberOfElements: 0,
  },
  selectedProduct: null,
  currentOption: {},
  isLoading: false,
};

const namespaced = true;

export const product: Module<ProductState, RootState> = {
  state,
  mutations: {
    setProducts: (state, products: Page<Product>) => {
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
      { commit, state },
      option: Option = {
        keyword: "",
        catId: null,
      }
    ) => {
      commit("setLoading", true);
      commit("setProducts", {
        content: [],
        number: 0,
        numberOfElements: 0,
      });
      const tempOption: Option = {
        catId: option.catId || state.currentOption.catId || undefined,
        keyword: option.keyword || state.currentOption.keyword || undefined,
        retailerIds:
          option.retailerIds || state.currentOption.retailerIds || undefined,
      };
      productService.searchProduct(tempOption).then((res) => {
        commit("setProducts", res.data);
        commit("setCurrentOption", option);
        commit("setLoading", false);
      });
    },
    loadMore: ({ commit, state }) => {
      commit("setLoading", true);
      if (!state.products.last) {
        productService
          .searchProduct(state.currentOption, state.products.number + 1)
          .then((res) => {
            commit("setProducts", {
              ...res.data,
              content: state.products.content.concat(res.data.content),
              numberOfElements:
                state.products.numberOfElements + res.data.numberOfElements,
            });
            commit("setLoading", false);
          });
      }
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
