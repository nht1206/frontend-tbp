import { AxiosResponse } from "axios";
import http from "@/service/http";
import Banner from "@/models/Banner";
import Page from "@/models/Page";

export interface BannerPayload {
  description: string;
  imageUrl: string;
  redirectUrl: string;
  title: string;
}

function getAvailableBanner(): Promise<AxiosResponse<Banner[]>> {
  return http.get<Banner[]>("banner/isOn");
}

function getAllBanner(prams: string): Promise<AxiosResponse<Page<Banner>>> {
  return http.get<Page<Banner>>("banner" + prams);
}

function findById(id: string): Promise<AxiosResponse<Banner>> {
  return http.get<Banner>("banner/" + id);
}

function createBanner(payload: BannerPayload): Promise<AxiosResponse<any>> {
  return http.post("banner", payload);
}

function updateBanner(
  id: string,
  payload: BannerPayload
): Promise<AxiosResponse<any>> {
  return http.put("banner/" + id, payload);
}

function toggleStatus(id: number): Promise<AxiosResponse<any>> {
  return http.put("banner/toggleStatus/" + id);
}

function deleteBanner(id: number): Promise<AxiosResponse<any>> {
  return http.delete("banner/" + id);
}

export default {
  getAvailableBanner,
  createBanner,
  updateBanner,
  deleteBanner,
  toggleStatus,
  getAllBanner,
  findById,
};
