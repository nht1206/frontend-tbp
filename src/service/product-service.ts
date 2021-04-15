import Option from "@/models/option";
import Page from "@/models/Page";
import Product from "@/models/product";
import http from "@/service/http";
import { AxiosResponse } from "axios";

function searchProduct(option: Option): Promise<AxiosResponse<Page<Product>>> {
  return http.post<Page<Product>>("filter", option);
}

export default {
  searchProduct,
};
