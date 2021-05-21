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

function getApprovedProducts(
  params: string
): Promise<AxiosResponse<Page<ProductStatisticsResponse>>> {
  return http.get<Page<ProductStatisticsResponse>>(
    "product/approveTrue" + params
  );
}

function getUserProducts(
  params: string
): Promise<AxiosResponse<Page<ProductStatisticsResponse>>> {
  return http.get<Page<ProductStatisticsResponse>>(
    "product/listProductForRetailer" + params
  );
}

function getPendingProducts(
  params: string
): Promise<AxiosResponse<Page<ProductStatisticsResponse>>> {
  return http.get<Page<ProductStatisticsResponse>>(
    "product/approveFalse" + params
  );
}

function toggleProductStatus(id: number): Promise<AxiosResponse<any>> {
  return http.put("product/toggle/" + id);
}

export interface ProductPayload {
  brandId: number;
  categoryId: number;
  images: string[];
  longDescription: string;
  shortDescription: string;
  title: string;
  price?: string;
  retailerId?: string;
}

function createProduct(payload: ProductPayload): Promise<AxiosResponse<any>> {
  return http.post("product", payload);
}

function createProductByRetailer(
  payload: ProductPayload
): Promise<AxiosResponse<any>> {
  return http.post("product/retailerCreateProduct", payload);
}

function updateProduct(
  id: string,
  payload: ProductPayload
): Promise<AxiosResponse<any>> {
  return http.put("product/" + id, payload);
}

function approveProduct(id: string): Promise<AxiosResponse<any>> {
  return http.put("product/approve/" + id);
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
  getUserProducts,
  createProduct,
  createProductByRetailer,
  updateProduct,
  approveProduct,
  deleteProduct,
  toggleProductStatus,
};
