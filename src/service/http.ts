import store from "@/store";
import axios from "axios";
import storageService from "./storage-service";

axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;

axios.interceptors.request.use(function (config) {
  const token = storageService.getToken();
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      store.dispatch("auth/logout");
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
