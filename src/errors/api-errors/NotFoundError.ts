import { CustomApiError } from "./CustomApiError";

class NotFoundError extends CustomApiError {
  statusCode = 404;
  constructor(message: string) {
    super(message);
  }
}

export { NotFoundError };
