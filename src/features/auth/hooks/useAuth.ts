// External library
import { useContext } from "react";

// Context
import { AuthContext, AuthContextProps } from "../context/AuthContext";

// Factory
import errorFactory from "@features/shared/errors/factory/errorFactory";

// Guards
import { Either, right } from "@features/shared/errors/pattern/Either";

// Error
import { ApplicationError } from "@features/shared/errors/base/ApplicationError";

export const useAuth = (): Either<ApplicationError, AuthContextProps> => {
  const context = useContext<AuthContextProps | undefined>(AuthContext);

  if (!context) {
    return errorFactory("custom", "Auth context not available.");
  }

  return right(context);
};
