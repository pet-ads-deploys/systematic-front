// External library
import { isAxiosError } from "axios";

// Infra
import Axios from "../../../infrastructure/http/axiosClient";

// Factory
import errorFactory from "@features/shared/errors/factory/errorFactory";

// Error
import { type Either, right } from "@features/shared/errors/pattern/Either";
import { ApplicationError } from "@features/shared/errors/base/ApplicationError";
import { User } from "../types";

// Types
type RegisterPayload = User;

type RegisterResponse = User;

export default async function register(
  data: RegisterPayload
): Promise<Either<ApplicationError, RegisterResponse>> {
  try {
    const { data: response } = await Axios.post<RegisterResponse>("user", data);
    return right(response);
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message;
      return errorFactory("validation", message);
    }

    if (error instanceof Error) {
      return errorFactory("custom", error.message);
    }

    return errorFactory("custom", "An unexpected error occurred.");
  }
}
