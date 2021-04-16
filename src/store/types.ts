import Category from "@/models/category";
import Option from "@/models/option";
import Page from "@/models/page";
import Product from "@/models/product";
import Retailer from "@/models/retailer";

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

export interface RetailerState {
  retailers: Retailer[];
}
