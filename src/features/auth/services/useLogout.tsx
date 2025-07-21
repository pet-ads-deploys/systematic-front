import axios from "axios";
import useDeleteUserData from "../hooks/useDeleteUserData";

export default function useLogout() {
  const url = "http://localhost:8080/";
  const deleteUserData = useDeleteUserData();

  const logout = async () => {
    try {
      const response = await axios.post(
        url + "api/v1/auth/logout",
        {},
        { withCredentials: true }
      );
      console.log(response);
      deleteUserData();
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return logout;
}
