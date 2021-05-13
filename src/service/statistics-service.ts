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

function getKeywordStatistics(
  params = ""
): Promise<AxiosResponse<Page<KeywordStatisticsResponse>>> {
  return http.get<Page<KeywordStatisticsResponse>>(
    "statistic/statisticSearchByDateAndKeyword" + params
  );
}
export interface ProductStatisticsResponse {
  highestPrice: number;
  id: number;
  image: string;
  lowestPrice: number;
  rate: number;
  shortDescription: string;
  title: string;
  viewCount: number;
}

function getProductStatistics(
  params = ""
): Promise<AxiosResponse<Page<ProductStatisticsResponse>>> {
  return http.get<Page<ProductStatisticsResponse>>(
    "statistic/statisticProductByDateAndKeyword" + params
  );
}

export interface VisitStatisticsResponse {
  rateUser: {
    auth: number;
    anonymous: number;
  };
  statisticAccess: number[];
  statisticSearch: number[];
  statisticViewCount: number[];
}

function getVisitStatistics(
  type = "month"
): Promise<AxiosResponse<VisitStatisticsResponse>> {
  return http.get<VisitStatisticsResponse>(`dashboard/statistic?type=${type}`);
}

function getViewCountData(params: string): Promise<AxiosResponse<number[]>> {
  return http.get(`statistic/viewCount` + params);
}

function getTrafficData(params: string): Promise<AxiosResponse<number[]>> {
  return http.get(`statistic/access` + params);
}

function getSearchCountData(params: string): Promise<AxiosResponse<number[]>> {
  return http.get(`statistic/search` + params);
}

function downloadReport(): Promise<AxiosResponse<any>> {
  return http.get(`dashboard/export`, {
    headers: {
      "Content-Disposition": "attachment; filename=customer.xlsx",
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
    responseType: "arraybuffer",
  });
}

export default {
  getOverviewStatistics,
  getKeywordStatistics,
  getVisitStatistics,
  getViewCountData,
  getProductStatistics,
  downloadReport,
  getSearchCountData,
  getTrafficData,
};
