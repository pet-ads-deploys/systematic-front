// Guards
import { type Either, left } from "../pattern/Either";

// Error
import { ApplicationError } from "../base/ApplicationError";

// Types
import type { ErrorType } from "../types";

// Classes
import { DatabaseError } from "../custom/DatabaseError";
import { EntityNotFoundError } from "../custom/EntityNotFoundError";
import { UnauthorizedError } from "../custom/UnauthorizedError";
import { ForbiddenError } from "../custom/ForbiddenErro";
import { NetworkError } from "../custom/NetworkError";
import { ValidationError } from "../custom/ValidationError";

// Function
export default function errorFactory(
  type: ErrorType,
  message?: string,
  statusCode?: number,
  isOperational?: boolean
): Either<ApplicationError, never> {
  const errorMap: Record<ErrorType, () => ApplicationError> = {
    custom: () =>
      new ApplicationError(
        message ?? "Unknown error",
        statusCode,
        isOperational
      ),
    database: () => new DatabaseError(message),
    forbidden: () => new ForbiddenError(message),
    network: () => new NetworkError(message),
    not_found: () => {
      return new EntityNotFoundError(message);
    },
    validation: () => new ValidationError(message),
    unauthorized: () => new UnauthorizedError(message),
  };

  return left(errorMap[type]());
}
