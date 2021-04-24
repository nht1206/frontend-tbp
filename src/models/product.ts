import Category from "@/models/category";
import Brand from "./brand";
import Store from "./store";
export default interface Product {
  id: number;
  title: string;
  category: Category;
  brand: Brand;
  shortDescription: string;
  longDescription: string;
  images: string[];
  lowestPrice: number;
  highestPrice: number;
  prices: {
    url: string;
    price: number;
    store: Store;
  };
}
