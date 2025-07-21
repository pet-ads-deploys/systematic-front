// Class
import { ApplicationError } from "../base/ApplicationError";

export class UnauthorizedError extends ApplicationError {
  constructor(message = "Unauthorized") {
    super(message, 401);
    this.name = "UnauthorizedError";
  }
}
