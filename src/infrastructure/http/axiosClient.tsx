// External library
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// Constants
import { ERROR_CODE } from "@features/shared/errors/constants/error";

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
      const refreshResponse = await Axios.post("auth/refresh", {});
      const token = refreshResponse.data.accessToken;

      localStorage.setItem("accessToken", token);

      originalRequest.headers.Authorization = `Bearer ${token}`;

      return Axios(originalRequest);
    } catch (err) {
      return Promise.reject(err);
    }
  }
);

export default Axios;
