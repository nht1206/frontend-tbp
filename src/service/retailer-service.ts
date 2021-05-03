import Retailer from "@/models/Retailer";
import http from "@/service/http";
import { AxiosResponse } from "axios";

function getRetailers(): Promise<AxiosResponse<Retailer[]>> {
  return http.get<Retailer[]>("retailer");
}

export default {
  getRetailers,
};
