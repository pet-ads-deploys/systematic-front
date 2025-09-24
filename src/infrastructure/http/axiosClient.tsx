// External library
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const Axios = axios.create({
  baseURL: process.env.PUBLIC_API_URL,
  withCredentials: true,
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

    if (status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const refreshResponse = await Axios.post("auth/refresh", {});
      const token = refreshResponse.data.accessToken;

      localStorage.setItem("accessToken", token);

      originalRequest.headers.set("Authorization", `Bearer ${token}`);

      return Axios(originalRequest);
    } catch (err) {
      return Promise.reject(err);
    }
  }
);

export default Axios;
