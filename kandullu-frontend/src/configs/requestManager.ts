/* eslint-disable @typescript-eslint/no-explicit-any */
import { notification } from "antd";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const BASE_URL = '/api';

const logoutRedirect = (error: AxiosError) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth");
  }

  notification.warning({ message: "Session expired!" });

  setTimeout(() => {
    window.location.href = window.location.origin + "/";
    return Promise.reject(error);
  }, 3000);
};

export const requestManager = axios.create({
  baseURL: BASE_URL, // Set the baseURL for your API
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// Adds request interceptor
requestManager.interceptors.request.use(
  (config) => {
    const AUTH: any | null = JSON.parse(localStorage.getItem("auth") || "null");
    if (AUTH?.access) {
      (config.headers as any)["Authorization"] = `Bearer ${AUTH.access}`;
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

// Adds response interceptor
requestManager.interceptors.response.use(
  (response) => {
    // Any status code that lies within the range of 2xx causes this function to trigger
    // Do something with response data
    return response;
  },
  (error) => {
    // Any status codes that fall outside the range of 2xx cause this function to trigger
    // Do something with response error
    const axiosError = error as AxiosError;
    const originalRequest = axiosError.config;

    if (error.response?.status === 401 && originalRequest?.url !== "login/") {
      logoutRedirect(error);
    }

    return Promise.reject(error);
  }
);

export default requestManager;
