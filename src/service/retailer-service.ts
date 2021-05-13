import Page from "@/models/Page";
import Retailer from "@/models/Retailer";
import http from "@/service/http";
import { AxiosResponse } from "axios";

function getRetailers(): Promise<AxiosResponse<Retailer[]>> {
  return http.get<Retailer[]>("retailer");
}

function getApprovedRetailers(): Promise<AxiosResponse<Page<Retailer>>> {
  return http.get<Page<Retailer>>("retailer/listRetailerApproveTrue");
}

function getPendingRetailers(): Promise<AxiosResponse<Page<Retailer>>> {
  return http.get<Page<Retailer>>("retailer/listRetailerApproveFalse");
}

export interface RetailerPayload {
  userId: number;
  description: string;
  homePage: string;
  logo: string;
  name: string;
}

function createRetailer(payload: RetailerPayload): Promise<AxiosResponse<any>> {
  return http.post<any>("retailer");
}

function updateRetailer(payload: RetailerPayload): Promise<AxiosResponse<any>> {
  return http.put<any>("retailer");
}

function approveRetailer(id: number): Promise<AxiosResponse<any>> {
  return http.put<any>(`retailer/approveRetailer/${id}`);
}

function deleteRetailer(id: number): Promise<AxiosResponse<any>> {
  return http.delete<any>(`retailer/${id}`);
}

export default {
  getRetailers,
  getApprovedRetailers,
  getPendingRetailers,
  createRetailer,
  updateRetailer,
  approveRetailer,
  deleteRetailer,
};
