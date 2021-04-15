import Product from "@/models/product";
import productService from "@/service/product-service";
export default {
  state: () => ({
    products: [] as Product[],
    selectedProduct: null,
    currentOption: {
      keyword: "",
      catId: null,
    },
  }),
  mutations: {
    setProducts: (state: any, products: Product[]) => {
      state.products = products;
    },
    setSelectedProduct: (state: any, product: Product) => {
      state.selectedProduct = product;
    },
    setCurrentOption: (state: any, option: any) => {
      state.currentOption = option;
    },
  },
  actions: {
    searchProducts: (
      { commit }: any,
      option: any = {
        keyword: "",
        catId: null,
      }
    ) => {
      productService.searchProduct(option).then((res) => {
        commit("setProducts", res.data.content);
        commit("setCurrentOption", option);
      });
    },
  },
  getters: {
    products: (state: any) => state.products,
    selectedProduct: (state: any) => state.selectedProduct,
    currentOption: (state: any) => state.currentOption,
  },
  namespaced: true,
};
