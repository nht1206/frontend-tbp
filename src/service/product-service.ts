import Option from "@/models/option";
import Page from "@/models/page";
import Product from "@/models/product";
import http from "@/service/http";
import { AxiosResponse } from "axios";

function searchProduct(
  option: Option,
  pageNumber = 0
): Promise<AxiosResponse<Page<Product>>> {
  return http.post<Page<Product>>(`filter?page=${pageNumber}&size=3`, option);
}

export default {
  searchProduct,
};
