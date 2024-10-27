import axios, { AxiosError, AxiosResponse } from "axios";
import { clientConfig, handleAxiosError } from "../helper/util";

const api = axios.create({
  // baseURL: import.meta.env.VITE_API_URL,
  baseURL: "http://127.0.0.1:3000",

  headers: { "Content-type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    return clientConfig(config);
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (err: AxiosError) => {
    if (err.response?.status === 401) {
      handleAxiosError();
    }

    return Promise.reject(err);
  }
);

export default api;
