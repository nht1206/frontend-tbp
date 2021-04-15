import Category from "@/models/category";
export default interface Product {
  id: string;
  title: string;
  category: Category;
  brand: any;
  shortDescription: string;
  longDescription: string;
  images: string[];
  lowestPrice: number;
  highestPrice: number;
  listStores: any[];
}
