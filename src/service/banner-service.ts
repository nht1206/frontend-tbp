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

function getAllBanner(): Promise<AxiosResponse<Page<Banner>>> {
  return http.get<Page<Banner>>("banner");
}

function createBanner(payload: BannerPayload): Promise<AxiosResponse<any>> {
  return http.post("banner", payload);
}

function updateBanner(payload: BannerPayload): Promise<AxiosResponse<any>> {
  return http.put("banner", payload);
}

function toggleStatus(id: number): Promise<AxiosResponse<any>> {
  return http.put("banner/toggleStatus" + id);
}

function deleteBanner(id: number): Promise<AxiosResponse<any>> {
  return http.delete("banner" + id);
}

export default {
  getAvailableBanner,
  createBanner,
  updateBanner,
  deleteBanner,
  toggleStatus,
  getAllBanner,
};
