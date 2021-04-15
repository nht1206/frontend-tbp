import http from "@/service/http";
import Category from "@/models/category";
import { AxiosResponse } from "axios";

function getCategories(): Promise<AxiosResponse<Category[]>> {
  return http.get<Category[]>("category");
}

export default {
  getCategories,
};
