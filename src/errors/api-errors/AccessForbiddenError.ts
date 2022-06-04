class AccessForbiddenError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 403;
  }
}

export { AccessForbiddenError };
