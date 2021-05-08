import { AxiosResponse } from "axios";
import http from "@/service/http";

function getOverviewStatistics(): Promise<AxiosResponse<any>> {
  return http.get("dashboard/overView");
}

function getKeywordStatistics(): Promise<AxiosResponse<any>> {
  return http.get("dashboard/statisticKeyword");
}

export default {
  getOverviewStatistics,
  getKeywordStatistics,
};
