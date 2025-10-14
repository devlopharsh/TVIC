import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// ✅ Base URL from .env
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

// 🧱 Create an Axios instance
const apiInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // optional: 10s timeout
});

// ⚙️ Request Interceptor
import type { InternalAxiosRequestConfig } from "axios";

apiInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        (config.headers as any)["Authorization"] = `Bearer ${token}`;
      }
    }

    // Automatically set Content-Type
    if (config.data instanceof FormData) {
      // Let browser handle Content-Type (multipart/form-data)
      delete config.headers["Content-Type"];
    } else if (config.data && typeof config.data === "object") {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ⚙️ Response Interceptor
apiInstance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error.response?.data || error);
  }
);

// 💡 Generic typing for request/response
export interface ApiResponse<T = any> {
  inspection(inspection: any): unknown;
  token: any;
  data: T;
  message?: string;
  success?: boolean;
}

// 🧩 API object
export const API = {
  get: async <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => apiInstance.get(url, config),

  post: async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => apiInstance.post(url, data, config),

  put: async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => apiInstance.put(url, data, config),

  delete: async <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => apiInstance.delete(url, config),
};
