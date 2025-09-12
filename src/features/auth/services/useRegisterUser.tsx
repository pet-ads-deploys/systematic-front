// Service
import Axios from "../../../infrastructure/http/axiosClient";

// Factory
import errorFactory from "@features/shared/errors/factory/errorFactory";

// Errors
import type { Either } from "@features/shared/errors/pattern/Either";
import { ApplicationError } from "@features/shared/errors/base/ApplicationError";

// Type Guard
import { right } from "@features/shared/errors/pattern/Either";

// Types
import type { User } from "../types";

type RegisterUser = {
  data: User;
};

export default async function registerUser({
  data,
}: RegisterUser): Promise<Either<ApplicationError, User>> {
  try {
    const response = await Axios.post<User>(`user`, data);

    if (response.status === 201) {
      return right(response.data);
    } else {
      return errorFactory("database", "Failed to create user");
    }
  } catch (error: any) {
    if (error.response && error.response.data) {
      const { detail, message } = error.response.data;
      return errorFactory("custom", detail || message || "An error occurred");
    }
    return errorFactory("custom", error.message || "Unknown error");
  }
}
