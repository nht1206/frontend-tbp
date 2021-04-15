import Category from "@/models/category";
import Option from "@/models/option";
import Product from "@/models/product";

export interface RootState {}

export interface CartState {
  cart: Product[];
}

export interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  currentOption: Option;
  isLoading: boolean;
}

export interface CategoryState {
  categories: Category[];
}
