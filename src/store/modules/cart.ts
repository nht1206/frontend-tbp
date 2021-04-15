import Product from "@/models/product";
export default {
  state: () => ({
    cart: [] as Product[],
  }),
  mutations: {
    addToCart(state: any, product: Product) {
      state.cart.push(product);
    },
    removeProduct(state: any, id: string) {
      state.cart = state.cart.filter((p: Product) => p.id !== id);
    },
    clear(state: any) {
      state.cart = [];
    },
  },
  actions: {},
  getters: {
    cart: (state: any) => state.cart,
  },
  namespaced: true,
};
