import http from "@/service/http";
import { AxiosResponse } from "axios";
export interface SubscribePayload {
  email: string;
}

function subsribde(payload: SubscribePayload): Promise<AxiosResponse<any>> {
  return http.post("subsriber/post", payload);
}

export default {
  subsribde,
};
