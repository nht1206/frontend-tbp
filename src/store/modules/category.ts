import Category from "@/models/category";
import categoryService from "@/service/category-service";
export default {
  state: () => ({
    categories: [] as Category[],
  }),
  mutations: {
    setCategories: (state: any, categories: Category[]) => {
      state.categories = categories;
    },
  },
  actions: {
    loadCategories: ({ commit }: any) => {
      categoryService.getCategories().then((res) => {
        commit("setCategories", res.data);
      });
    },
  },
  getters: {
    categories: (state: any) => state.categories,
  },
  namespaced: true,
};
