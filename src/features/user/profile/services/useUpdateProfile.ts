// Infra
import Axios from "../../../../infrastructure/http/axiosClient";

// Error
import { ApplicationError } from "@features/shared/errors/base/ApplicationError";

// Factory
import errorFactory from "@features/shared/errors/factory/errorFactory";

// Guards
import { type Either, right } from "@features/shared/errors/pattern/Either";

// Types
import type { User } from "@features/auth/types";

type UpdateUserDto = Omit<User, "username" | "password">;

type InvalidEntry = {
  field: string;
  entry: string;
  message: string;
};

type UpdateProfileOutput = {
  userId: string;
  name: string;
  username: string;
  email: string;
  affiliation: string;
  country: string;
  invalidEntries: InvalidEntry[];
};

type useUpdateProfileOutput = {
  update: (
    user: Partial<UpdateUserDto>
  ) => Promise<Either<ApplicationError, UpdateProfileOutput>>;
};

export default function useUpdateProfile(): useUpdateProfileOutput {
  const update = async (user: Partial<UpdateUserDto>) => {
    try {
      const response = await Axios.patch("user/profile", {
        ...user,
      });
      user.country;
      return right(response.data);
    } catch (error) {
      return errorFactory("database", (error as Error).message);
    }
  };

  return {
    update,
  };
}
