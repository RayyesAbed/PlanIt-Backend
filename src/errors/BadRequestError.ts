import HttpError from "./HttpError";

export class BadRequestError extends HttpError {
  constructor(message: string, details?: unknown) {
    super(message, 400, details);
  }
}
