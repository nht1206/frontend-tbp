import http from "@/service/http";
import { AxiosResponse } from "axios";

function searchProduct(option: any): Promise<AxiosResponse<any>> {
  return http.post<any>("filter", option);
}

export default {
  searchProduct,
};
