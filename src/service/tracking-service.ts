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

function trackingProduct(id: string): Promise<AxiosResponse<any>> {
  return http.post(`tracking/product?id=${id}`);
}

function trackingAccess(): Promise<AxiosResponse<any>> {
  return http.post("tracking/access");
}

export default {
  trackingKeyword,
  trackingProduct,
  trackingAccess,
};
