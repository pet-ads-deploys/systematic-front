// Service
import Axios from "../../../interceptor/interceptor";

// Hooks
import useDeleteUserData from "@features/auth/hooks/useDeleteUserData";

export default function useLogout() {
  const deleteUserData = useDeleteUserData();

  const logout = async () => {
    try {
      await Axios.post(
        "http://localhost:8080/api/v1/auth/logout",
        {},
        { withCredentials: true }
      );
      deleteUserData();
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return logout;
}
