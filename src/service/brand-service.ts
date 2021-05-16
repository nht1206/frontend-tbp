import http from "@/service/http";
import Brand from "@/models/Brand";
import { AxiosResponse } from "axios";

function getBrands(): Promise<AxiosResponse<Brand[]>> {
  return http.get<Brand[]>("brand");
}

export default {
  getBrands,
};
