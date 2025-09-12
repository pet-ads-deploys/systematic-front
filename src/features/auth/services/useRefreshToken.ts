// Service
import Axios from "../../../infrastructure/http/axiosClient";

export default async function useRefreshAccessToken() {
  try {
    const response = await Axios.post(`auth/refresh`, {});
    return response.request;
  } catch (err) {
    console.error("Failed to refresh access token:", err);
    throw err;
  }
}
