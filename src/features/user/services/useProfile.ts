// External library
import useSWR from "swr";

// Infra
import Axios from "../../../infrastructure/http/axiosClient";

// Utils
import getRequestOptions from "@features/auth/utils/getRequestOptions";

// Error
import { ApplicationError } from "@features/shared/errors/base/ApplicationError";

// Factory
import errorFactory from "@features/shared/errors/factory/errorFactory";

// Guards
import { type Either, right } from "@features/shared/errors/pattern/Either";

// Types
import type { User } from "@features/auth/types";
export interface Profile extends User {
  userId: string;
  authorities: string[];
}

export default function useProfile() {
  const fetcher = async (): Promise<Either<ApplicationError, Profile>> => {
    try {
      const options = getRequestOptions();
      const response = await Axios.get<Profile>(
        "http://localhost:8080/api/v1/user/profile",
        options
      );
      return right(response.data);
    } catch (error) {
      return errorFactory("custom", (error as Error).message);
    }
  };

  const { data, error, isLoading, mutate } = useSWR<
    Either<ApplicationError, Profile>
  >("/api/v1/user/profile", fetcher);

  return {
    profile: data,
    isLoading,
    isError: error,
    mutate,
  };
}
