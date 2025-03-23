import axios, { AxiosRequestConfig } from "axios";
import { getToken, refreshToken } from "../keycloak/keycloak.service";

const publicApi = axios.create({
  baseURL: `http://localhost:3000`,
});

const privateApi = axios.create({
  baseURL: `http://localhost:3000`,
});

privateApi.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Authorization header:", config.headers.Authorization);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

privateApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshToken();
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return privateApi(originalRequest);
        }
      } catch (refreshError) {
        console.error(`Token refresh failed: ${refreshError}`);
      }
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  public: {
    get: (url: string, config?: AxiosRequestConfig) =>
      publicApi.get(url, config),

    post: (url: string, data?: any, config?: AxiosRequestConfig) =>
      publicApi.post(url, data, config),

    put: (url: string, data?: any, config?: AxiosRequestConfig) =>
      publicApi.put(url, data, config),

    patch: (url: string, data?: any, config?: AxiosRequestConfig) =>
      publicApi.patch(url, data, config),

    delete: (url: string, config?: AxiosRequestConfig) =>
      publicApi.delete(url, config),
  },

  private: {
    get: (url: string, config?: AxiosRequestConfig) =>
      privateApi.get(url, config),

    post: (url: string, data?: any, config?: AxiosRequestConfig) =>
      privateApi.post(url, data, config),

    put: (url: string, data?: any, config?: AxiosRequestConfig) =>
      privateApi.put(url, data, config),

    patch: (url: string, data?: any, config?: AxiosRequestConfig) =>
      privateApi.patch(url, data, config),

    delete: (url: string, config?: AxiosRequestConfig) =>
      privateApi.delete(url, config),
  },
};
