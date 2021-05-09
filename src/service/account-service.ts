import { AxiosResponse } from "axios";
import http from "@/service/http";
import Page from "@/models/Page";

export interface AccountResponse {
  id: number;
  username: string;
  fullName: string;
  address: string;
  email: string;
  phoneNumber: string;
  registerDay: string;
}

function getListGuestAccount(
  params: string
): Promise<AxiosResponse<Page<AccountResponse>>> {
  return http.get<Page<AccountResponse>>("user/listGuestAccount" + params);
}

function getListRetailerAccount(
  params: string
): Promise<AxiosResponse<Page<AccountResponse>>> {
  return http.get<Page<AccountResponse>>("user/listRetailerAccount" + params);
}

export default {
  getListGuestAccount,
  getListRetailerAccount,
};
