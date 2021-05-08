import { AxiosResponse } from "axios";
import http from "@/service/http";

export interface OverviewResponse {
  product: number;
  retailer: number;
  search: number;
  user: number;
  visitor: number;
}

function getOverviewStatistics(): Promise<AxiosResponse<OverviewResponse>> {
  return http.get<OverviewResponse>("dashboard/overView");
}

function getKeywordStatistics(): Promise<AxiosResponse<any>> {
  return http.get("dashboard/statisticKeyword");
}

export default {
  getOverviewStatistics,
  getKeywordStatistics,
};
