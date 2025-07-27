// Service
import Axios from "../../../service/api/Axios";

const refreshAccessToken = async (): Promise<string> => {
  try {
    const response = await Axios.post(
      `http://localhost:8080/api/v1/auth/refresh`,
      {},
      { withCredentials: true }
    );
    return response.request;
  } catch (err) {
    console.error("Failed to refresh access token:", err);
    throw err;
  }
};

export default refreshAccessToken;
