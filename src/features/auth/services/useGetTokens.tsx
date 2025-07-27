// Service
import Axios from "../../../infrastructure/http/axiosClient";

// Types
import { AccessCredentials } from "../types";

export const useGetTokens = async (credentials: AccessCredentials) => {
  const { username, password } = credentials;

  try {
    const response = await Axios.post(`http://localhost:8080/api/v1/auth`, {
      username,
      password,
    });
    if (response.status === 200) {
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem(
        "myRevisionsLink",
        response.data._links["find-my-reviews"].href
      );
    } else {
      throw new Error("Falha ao fazer requisição");
    }
  } catch (error) {
    console.error(error);
  }

  return 1;
};
