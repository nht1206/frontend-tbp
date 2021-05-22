import { AxiosResponse } from "axios";
import http from "@/service/http";
import Retailer from "@/models/Retailer";

export interface PriceResponse {
  retailer: Retailer;
  urlProduct: string;
  latestPrice: number;
  productRetailerId: number;
  enable: boolean;
  approve: boolean;
  createdBy: string;
}

function getListPrice(id: string): Promise<AxiosResponse<PriceResponse[]>> {
  return http.get<PriceResponse[]>("price/product/" + id);
}

function getListPendingPrice(): Promise<AxiosResponse<PriceResponse[]>> {
  return http.get<PriceResponse[]>("price/approveFalse");
}

export interface CreatePricePayload {
  retailerId: string;
  price: string;
  url: string;
}

function addNewPriceByAdmin(id: string, payload: CreatePricePayload) {
  return http.post("price/adminCreateNewPrice/" + id, payload);
}

function addNewPriceByRetailer(id: string, payload: CreatePricePayload) {
  return http.post("price/retailerCreateNewPrice/" + id, payload);
}

export interface UpdatePricePayload {
  price: string;
  url: string;
}

function approvePrice(id: number) {
  return http.put("price/adminApprovePrice/" + id);
}

function updatePriceByAdmin(id: string, payload: UpdatePricePayload) {
  return http.put("price/adminUpdatePrice/" + id, payload);
}

function updatePriceByRetailer(id: string, payload: UpdatePricePayload) {
  return http.put("price/retailerUpdatePrice/" + id, payload);
}

function togglePriceStatus(id: number) {
  return http.put("price/toggle/" + id);
}

function deletePriceByAdmin(id: number) {
  return http.delete("price/adminDelete/" + id);
}

function deletePriceByRetailer(id: number) {
  return http.delete("price/retailerDelete/" + id);
}

export default {
  getListPrice,
  getListPendingPrice,
  approvePrice,
  addNewPriceByAdmin,
  addNewPriceByRetailer,
  updatePriceByAdmin,
  updatePriceByRetailer,
  togglePriceStatus,
  deletePriceByAdmin,
  deletePriceByRetailer,
};
