// Classes
import { Either, left } from "../pattern/Either";
import { ApplicationError } from "../base/ApplicationError";
import { DatabaseError } from "../custom/DatabaseError";
import { EntityNotFoundError } from "../custom/EntityNotFoundError";
import { UnauthorizedError } from "../custom/UnauthorizedError";

// Types
type ErrorType = "unauthorized" | "not_found" | "database" | "custom";

// Function
export default function errorFactory(
  type: ErrorType,
  message?: string
): Either<ApplicationError, never> {
  const errorMap: Record<ErrorType, () => ApplicationError> = {
    database: () => new DatabaseError(message),
    not_found: () => new EntityNotFoundError(message),
    unauthorized: () => new UnauthorizedError(message),
    custom: () => new ApplicationError(message ?? "Unknown error"),
  };

  return left(errorMap[type]());
}
