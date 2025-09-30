// External library
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// Store
import { useAuthStore } from "@features/auth/store/useAuthStore";

// Services
import refresh from "@features/auth/services/refresh";

// Constants
import { ERROR_CODE } from "@features/shared/errors/constants/error";
import { isLeft } from "@features/shared/errors/pattern/Either";

const Axios = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 100000,
});

Axios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!error.response) {
      return Promise.reject(error);
    }

    const { status } = error.response;

    const authCodes = [ERROR_CODE.unauthorized, ERROR_CODE.forbidden];

    if (authCodes.every((code) => code !== status) || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const result = await refresh();

      if (isLeft(result)) {
        useAuthStore.getState().logout();
        return Promise.reject(result.value);
      }

      const { accessToken } = result.value;

      localStorage.setItem("accessToken", accessToken);

      originalRequest.headers.Authorization = `Bearer ${accessToken}`;

      return Axios(originalRequest);
    } catch (err) {
      return Promise.reject(err);
    }
  }
);

export default Axios;
