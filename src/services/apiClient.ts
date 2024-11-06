import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  API_PATH,
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
  PATH,
} from "@/lib/constants";
import { getThinkEasy } from "@/services/generatedApi";
import { toaster } from "@/components/ui/toaster";
import { getLocalStorageValue, removeTokens } from "@/lib/utils";

export const thinkEasyApi = getThinkEasy();

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

export const setupInterceptors = () => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const { value: accessToken } = getLocalStorageValue(
        LOCAL_STORAGE_ACCESS_TOKEN_KEY,
      );
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        originalRequest.url.includes(API_PATH.REFRESH_TOKEN)
      ) {
        removeTokens();

        toaster.error({
          title: "Your session has expired. Please log in again.",
        });

        window.location.replace(PATH.LOGIN);
        return Promise.reject(error);
      }

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (!isRefreshing) {
          isRefreshing = true;
          const { value: refreshToken } = getLocalStorageValue(
            LOCAL_STORAGE_REFRESH_TOKEN_KEY,
          );

          if (refreshToken) {
            refreshPromise = thinkEasyApi
              .authControllerRefreshToken({ token: refreshToken })
              .then((response) => {
                const newAccessToken = response.data.access_token;
                if (newAccessToken) {
                  axiosInstance.defaults.headers.common["Authorization"] =
                    `Bearer ${newAccessToken}`;
                  localStorage.setItem("accessToken", newAccessToken);
                }
                return newAccessToken;
              })
              .catch((err) => {
                console.error({
                  title: "Unable to authenticate: " + err,
                });
                window.location.replace(PATH.LOGIN);
                return null;
              })
              .finally(() => {
                isRefreshing = false;
                refreshPromise = null;
              });
          } else {
            isRefreshing = false;
          }
        }

        const newAccessToken = await refreshPromise;

        if (newAccessToken) {
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        }
      }

      return Promise.reject(error);
    },
  );
};

setupInterceptors();

export const apiClient = async <T>(
  config: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return await axiosInstance(config);
};
