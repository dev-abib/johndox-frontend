import api from "./api";
import { AxiosError } from "axios";

api.interceptors.request.use(config => {
  const token = sessionStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  res => res,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { data } = await api.post("/auth/refresh");
      sessionStorage.setItem("accessToken", data.accessToken);

      originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default api;
