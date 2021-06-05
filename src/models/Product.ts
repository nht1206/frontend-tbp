import Category from "@/models/Category";
import Brand from "./Brand";
import Store from "./Store";
export default interface Product {
  id: number;
  title: string;
  category: Category;
  brand: Brand;
  shortDescription: string;
  longDescription: string;
  images: string[];
  rate: number;
  rated: boolean;
  lowestPrice: number;
  highestPrice: number;
  prices: {
    url: string;
    price: number;
    store: Store;
  }[];
}
