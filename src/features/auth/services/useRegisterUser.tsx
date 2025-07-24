// Service
import Axios from "../../../interceptor/interceptor";

// Types
import type { User } from "../types";

export default async function useRegisterUser(data: User) {
  return Axios.post(`http://localhost:8080/api/v1/user`, data);
}
