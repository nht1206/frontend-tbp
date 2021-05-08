import { AxiosResponse } from "axios";
import http from "@/service/http";
import Page from "@/models/Page";

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

export interface KeywordStatisticsResponse {
  id: number;
  keyword: string;
  numberOfSearch: number;
}

function getKeywordStatistics(): Promise<
  AxiosResponse<Page<KeywordStatisticsResponse>>
> {
  return http.get<Page<KeywordStatisticsResponse>>(
    "dashboard/statisticKeyword"
  );
}

export default {
  getOverviewStatistics,
  getKeywordStatistics,
};
