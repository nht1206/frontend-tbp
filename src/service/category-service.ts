import http from "@/service/http";
import Category from "@/models/Category";
import { AxiosResponse } from "axios";

function getCategories(): Promise<AxiosResponse<Category[]>> {
  return http.get<Category[]>("category");
}

export interface CreateCategoryPayload {
  title: string;
  description: string;
}

function createCategory(
  payload: CreateCategoryPayload
): Promise<AxiosResponse<any>> {
  return http.post<CreateCategoryPayload>("category/parent", payload);
}

function updateCategory(
  id: number,
  payload: CreateCategoryPayload
): Promise<AxiosResponse<any>> {
  return http.put<CreateCategoryPayload>(`category/parent/${id}`, payload);
}

export interface CreateSubCategoryPayload {
  title: string;
  description: string;
  parentId: number;
}

function createSubCategory(
  payload: CreateSubCategoryPayload
): Promise<AxiosResponse<any>> {
  return http.post<CreateSubCategoryPayload>("category/child", payload);
}

function updateSubCategory(
  id: number,
  payload: CreateSubCategoryPayload
): Promise<AxiosResponse<any>> {
  return http.put<CreateSubCategoryPayload>(`category/child/${id}`, payload);
}

export default {
  getCategories,
  createCategory,
  updateCategory,
  createSubCategory,
  updateSubCategory,
};
