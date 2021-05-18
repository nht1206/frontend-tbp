import { AxiosResponse } from "axios";
import http from "@/service/http";
import Retailer from "@/models/Retailer";

export interface PriceResponse {
  retailer: Retailer;
  urlProduct: string;
  latestPrice: number;
  productRetailerId: number;
  enable: true;
  approve: true;
}

function getListPrice(id: string): Promise<AxiosResponse<PriceResponse[]>> {
  return http.get<PriceResponse[]>("price/product/" + id);
}

function getListPendingPrice(): Promise<AxiosResponse<PriceResponse[]>> {
  return http.get<PriceResponse[]>("price/approveFalse");
}

export interface UpdatePricePayload {
  price: string;
  url: string;
}

function approvePrice(id: number) {
  return http.put("price/adminApprovePrice/" + id);
}

function updatePrice(id: number, payload: UpdatePricePayload) {
  return http.put("price/adminUpdatePrice/" + id, payload);
}

function togglePriceStatus(id: number) {
  return http.put("price/toggle/" + id);
}

export default {
  getListPrice,
  getListPendingPrice,
  approvePrice,
  updatePrice,
  togglePriceStatus,
};
