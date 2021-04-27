import Option from "@/models/option";
import Page from "@/models/page";
import Product from "@/models/product";
import Suggestion from "@/models/suggestion";
import http from "@/service/http";
import { AxiosResponse } from "axios";

function searchProduct(
  option: Option,
  pageNumber = 0
): Promise<AxiosResponse<Page<Product>>> {
  return http.post<Page<Product>>(`filter?page=${pageNumber}`, option);
}

function findById(id: string): Promise<AxiosResponse<Product>> {
  return http.get<Product>(`product/${id}`);
}

function getSuggestion(keyword: string): Promise<AxiosResponse<Suggestion[]>> {
  return http.get<Suggestion[]>(`suggestion?keyword=${keyword}`);
}

export default {
  searchProduct,
  findById,
  getSuggestion,
};
