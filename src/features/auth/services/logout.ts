// External library
import { isAxiosError } from "axios";

// Infra
import Axios from "../../../infrastructure/http/axiosClient";

// Error
import type { Either } from "@features/shared/errors/pattern/Either";
import { ApplicationError } from "@features/shared/errors/base/ApplicationError";

// Utils
import { userStorage } from "../utils/userStorage";

// Factory
import errorFactory from "@features/shared/errors/factory/errorFactory";

// Guard
import { right } from "@features/shared/errors/pattern/Either";

export default async function logout(): Promise<
  Either<ApplicationError, void>
> {
  try {
    await Axios.post("auth/logout", {});
    userStorage.clear();
    return right(undefined);
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message;
      return errorFactory("unauthorized", message);
    }

    if (error instanceof Error) {
      return errorFactory("custom", error.message);
    }

    return errorFactory("custom", "An unexpected error occurred.");
  }
}
