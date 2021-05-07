import http from "@/service/http";
import { AxiosResponse } from "axios";

export interface KeywordTrackingPayload {
  keyword: string;
}

function trackingKeyword(
  payload: KeywordTrackingPayload
): Promise<AxiosResponse<any>> {
  return http.post("tracking/search", payload);
}

function trackingProduct(): Promise<AxiosResponse<any>> {
  return http.post("tracking/product");
}

export default {
  trackingKeyword,
  trackingProduct,
};
