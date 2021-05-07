import http from "@/service/http";
import { AxiosResponse } from "axios";
export interface SubscribePayload {
  email: string;
}

function subscribe(payload: SubscribePayload): Promise<AxiosResponse<any>> {
  return http.post("subscriber/post", payload);
}

export default {
  subscribe,
};
