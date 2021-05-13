import Option from "@/models/Option";
import Page from "@/models/Page";
import Product from "@/models/Product";
import Suggestion from "@/models/Suggestion";
import http from "@/service/http";
import { AxiosResponse } from "axios";
import { ProductStatisticsResponse } from "./statistics-service";

function searchProduct(
  option: Option,
  pageNumber = 0
): Promise<AxiosResponse<Page<Product>>> {
  return http.post<Page<Product>>(`filter?page=${pageNumber}`, option);
}

function findById(id: string): Promise<AxiosResponse<Product>> {
  return http.get<Product>(`product/${id}`);
}

function rateProduct(id: number, payload: any) {
  return http.post(`product/rating/${id}`, payload);
}

function getSuggestion(keyword: string): Promise<AxiosResponse<Suggestion[]>> {
  return http.get<Suggestion[]>(`suggestion?keyword=${keyword}`);
}

function getLaptopHotDeal(): Promise<AxiosResponse<Product[]>> {
  return http.get("hotDeal/top10Laptop");
}

function getSmartPhoneHotDeal(): Promise<AxiosResponse<Product[]>> {
  return http.get("hotDeal/top10Smartphone");
}

function getProductHotDeal(): Promise<AxiosResponse<Product[]>> {
  return http.get("hotDeal/top10Product");
}

function getApprovedProducts(): Promise<
  AxiosResponse<Page<ProductStatisticsResponse>>
> {
  return http.get<Page<ProductStatisticsResponse>>("product/approveTrue");
}

function getPendingProducts(): Promise<
  AxiosResponse<Page<ProductStatisticsResponse>>
> {
  return http.get<Page<ProductStatisticsResponse>>("product/approveFalse");
}

export interface ProductPayload {
  brandId: number;
  categoryId: number;
  images: string[];
  longDescription: string;
  shortDescription: string;
  title: string;
}

function createProduct(payload: ProductPayload): Promise<AxiosResponse<any>> {
  return http.post("product", payload);
}

function updateProduct(
  id: number,
  payload: ProductPayload
): Promise<AxiosResponse<any>> {
  return http.put("product/" + id, payload);
}

function deleteProduct(id: number): Promise<AxiosResponse<any>> {
  return http.delete("product/" + id);
}

export default {
  searchProduct,
  findById,
  getSuggestion,
  getLaptopHotDeal,
  getProductHotDeal,
  getSmartPhoneHotDeal,
  rateProduct,
  getApprovedProducts,
  getPendingProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
