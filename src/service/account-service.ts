import { AxiosResponse } from "axios";
import http from "@/service/http";
import Page from "@/models/Page";
import { SignupPayload } from "./auth-service";

export interface AccountResponse {
  id: number;
  username: string;
  fullName: string;
  address: string;
  email: string;
  phoneNumber: string;
  registerDay: string;
}

function confirmEmail(token: string): Promise<AxiosResponse<any>> {
  return http.post("registerConfirm?token=" + token);
}

function getListGuestAccount(
  params: string
): Promise<AxiosResponse<Page<AccountResponse>>> {
  return http.get<Page<AccountResponse>>("user/listGuestAccount" + params);
}

function getUserById(id: string): Promise<AxiosResponse<AccountResponse>> {
  return http.get<AccountResponse>("user/" + id);
}

function getListRetailerAccount(
  params: string
): Promise<AxiosResponse<Page<AccountResponse>>> {
  return http.get<Page<AccountResponse>>("user/listRetailerAccount" + params);
}

function createGuestAccount(payload: SignupPayload) {
  return http.post("user/createGuestAccount", payload);
}

function toggleStatus(id: number) {
  return http.put(
    `https://thebestpricedtu.herokuapp.com/api/v1/user/toggleEnable/${id}`
  );
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

function changePassword(payload: ChangePasswordPayload) {
  return http.put("user/editPassword", payload);
}

export interface UpdateProfilePayload {
  address: string;
  fullName: string;
  phoneNumber: string;
}

function updateProfile(payload: UpdateProfilePayload) {
  return http.put("user/editProfile", payload);
}

export interface RegisterRetailerPayload {
  description: string;
  homePage: string;
  logo: string;
  name: string;
}

function registerRetailer(
  payload: RegisterRetailerPayload
): Promise<AxiosResponse<any>> {
  return http.post("user/registerRetailerAccount", payload);
}

export interface EditAccountPayload {
  username: string;
  fullName: string;
  address: string;
  email: string;
  phoneNumber: string;
}

function editAccount(id: number, payload: EditAccountPayload) {
  return http.put("user/editGuestOrRetailerAccount/" + id, payload);
}

function deleteGuestOrRetailer(id: number) {
  return http.delete(`user/deleteGuestOrRetailer/${id}`);
}

export interface UpdatePasswordPayload {
  newPassword: string;
}

function updateUserPassword(id: number, payload: UpdatePasswordPayload) {
  return http.put("user/adminEditPasswordForGuestOrRetailer/" + id, payload);
}

function createAdminAccount(payload: SignupPayload) {
  return http.post("user/createAdminAccount");
}

function deleteAdminAccount(id: number) {
  return http.post("user/superDelete/" + id);
}

export default {
  getListGuestAccount,
  getListRetailerAccount,
  confirmEmail,
  createGuestAccount,
  deleteGuestOrRetailer,
  getUserById,
  editAccount,
  toggleStatus,
  registerRetailer,
  changePassword,
  updateProfile,
  updateUserPassword,
  createAdminAccount,
  deleteAdminAccount,
};
