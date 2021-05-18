import { AxiosResponse } from "axios";
import http from "@/service/http";
import User from "@/models/User";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

function login(payload: LoginPayload): Promise<AxiosResponse<LoginResponse>> {
  return http.post("auth/login", payload);
}

export interface SignupPayload {
  username: string;
  fullName: string;
  email: string;
  address: string;
  phoneNumber: string;
  password: string;
}

function signup(payload: SignupPayload): Promise<AxiosResponse<any>> {
  return http.post("auth/registerGuest", payload);
}

function logout(): Promise<AxiosResponse<any>> {
  return http.post("auth/logout");
}

function validateToken(): Promise<AxiosResponse<any>> {
  return http.post("auth/validateToken");
}

function getUserInfo(): Promise<AxiosResponse<User>> {
  return http.get("auth/me");
}

export default {
  login,
  signup,
  logout,
  validateToken,
  getUserInfo,
};
