// Service
import Axios from "../../../infrastructure/http/axiosClient";

// Types
import type { User } from "../types";

export default async function useRegisterUser(data: User) {
  return Axios.post(`http://localhost:8080/api/v1/user`, data);
}
