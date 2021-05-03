import Option from "@/models/Option";
import Page from "@/models/Page";
import Product from "@/models/Product";
import Suggestion from "@/models/Suggestion";
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
