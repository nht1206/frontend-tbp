import Category from "@/models/category";
import Option from "@/models/option";
import Page from "@/models/Page";
import Product from "@/models/product";

export interface RootState {}

export interface CartState {
  cart: Product[];
}

export interface ProductState {
  products: Page<Product>;
  selectedProduct: Product | null;
  currentOption: Option;
  isLoading: boolean;
}

export interface CategoryState {
  categories: Category[];
}
