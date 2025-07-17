import axios from "axios";

const refreshAccessToken = async (): Promise<string> => {
    const url = "http://localhost:8080/";
    try {
        const response = await axios.post(`${url}api/v1/auth/refresh`, {}, {withCredentials: true});
        return response.request;
    } catch (err) {
        console.error("Failed to refresh access token:", err);
        throw err;
    }
}

export default refreshAccessToken;
