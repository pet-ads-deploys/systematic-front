// External library
import { isAxiosError } from "axios";

// Infra
import Axios from "../../../infrastructure/http/axiosClient";

// Factory
import errorFactory from "@features/shared/errors/factory/errorFactory";

// Error
import { type Either, right } from "@features/shared/errors/pattern/Either";
import { ApplicationError } from "@features/shared/errors/base/ApplicationError";

// Types
import { AccessCredentials } from "../types";

type LoginPayload = AccessCredentials;

type LoginResponse = {
  accessToken: string;
};

export default async function login(
  data: LoginPayload
): Promise<Either<ApplicationError, LoginResponse>> {
  try {
    const { data: response } = await Axios.post<LoginResponse>("auth", data);
    return right(response);
  } catch (error) {
    if (isAxiosError(error)) {
      const message = "Wrong username or password";
      return errorFactory("unauthorized", message);
    }

    if (error instanceof Error) {
      return errorFactory("custom", error.message);
    }

    return errorFactory("custom", "An unexpected error occurred.");
  }
}
