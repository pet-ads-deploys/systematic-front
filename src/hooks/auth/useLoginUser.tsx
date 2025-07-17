import axios from "../../interceptor/interceptor";
import userToLoginProp from "../../types/userToLogin";

import useStorageUserData from "./useStorageUserData";

export default async function useLoginUser(data: userToLoginProp) {
  const url = "http://localhost:8080/";
  const storageUserData = useStorageUserData(data);

  try {
    const response = await axios.post(url + "api/v1/auth", data, {
      withCredentials: true,
    });
    console.log(response);
    localStorage.setItem(
      "myReviewsLink",
      response.data._links["find-my-reviews"].href
    );

    storageUserData();
    return response;
  } catch (err) {
    throw err;
  }
}
