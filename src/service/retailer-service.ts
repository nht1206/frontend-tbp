import Page from "@/models/Page";
import Retailer from "@/models/Retailer";
import http from "@/service/http";
import { AxiosResponse } from "axios";

function getRetailers(): Promise<AxiosResponse<Retailer[]>> {
  return http.get<Retailer[]>("retailer");
}

export interface RetailerResponse {
  name: string;
  description: string;
  logoImage: "";
  homePage: "";
  userId: "";
}

function getRetailerById(id: string): Promise<AxiosResponse<RetailerResponse>> {
  return http.get<RetailerResponse>("retailer/" + id);
}

function getApprovedRetailers(
  params: string
): Promise<AxiosResponse<Page<RetailerResponse>>> {
  return http.get<Page<RetailerResponse>>(
    "retailer/listRetailerApproveTrue" + params
  );
}

function getPendingRetailers(
  params: string
): Promise<AxiosResponse<Page<RetailerResponse>>> {
  return http.get<Page<RetailerResponse>>(
    "retailer/listRetailerApproveFalse" + params
  );
}

export interface RetailerPayload {
  userId: string;
  description: string;
  homePage: string;
  logo: string;
  name: string;
}

function createRetailer(payload: RetailerPayload): Promise<AxiosResponse<any>> {
  return http.post<any>("retailer", payload);
}

function updateRetailer(
  id: string,
  payload: RetailerPayload
): Promise<AxiosResponse<any>> {
  return http.put<any>("retailer/" + id, payload);
}

function approveRetailer(id: number): Promise<AxiosResponse<any>> {
  return http.put<any>(`retailer/approveRetailer/${id}`);
}

function toggleRetailerStatus(id: number): Promise<AxiosResponse<any>> {
  return http.put<any>(`retailer/toggle/${id}`);
}

function deleteRetailer(id: number): Promise<AxiosResponse<any>> {
  return http.delete<any>(`retailer/${id}`);
}

export default {
  getRetailers,
  getRetailerById,
  getApprovedRetailers,
  getPendingRetailers,
  createRetailer,
  updateRetailer,
  approveRetailer,
  toggleRetailerStatus,
  deleteRetailer,
};
