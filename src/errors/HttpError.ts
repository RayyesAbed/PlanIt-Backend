class HttpError extends Error {
  statusCode: number;
  isOperational = true;
  details?: unknown;

  constructor(message: string, statusCode: number, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

export default HttpError;
