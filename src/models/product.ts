import Category from "@/models/category";
import Brand from "./brand";
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
  listStores: any[];
}
