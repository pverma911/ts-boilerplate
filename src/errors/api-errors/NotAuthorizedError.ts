import { CustomApiError } from "./CustomApiError";

class NotAuthorizedError extends CustomApiError {
  statusCode = 401;
  constructor(message: string) {
    super(message);
  }
}

export { NotAuthorizedError };
