// Service
import Axios from "../../../service/api/Axios";

// Hooks
import useStorageUserData from "@features/auth/hooks/useStorageUserData";

// Factory
import errorFactory from "@features/shared/errors/factory/errorFactory";

// Types
import { AccessCredentials } from "../types";

export default async function useLoginUser(data: AccessCredentials) {
  const storageUserData = useStorageUserData(data);

  try {
    const response = await Axios.post(
      "http://localhost:8080/api/v1/auth",
      data,
      {
        withCredentials: true,
      }
    );
    localStorage.setItem(
      "myReviewsLink",
      response.data._links["find-my-reviews"].href
    );
    storageUserData();
    return response;
  } catch (error) {
    errorFactory("unauthorized", (error as Error).message);
  }
}
