export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof AppError) return error.message;
  if (error instanceof Error) return error.message;
  return "An unexpected error occurred";
}

export function apiErrorResponse(error: unknown) {
  if (error instanceof AppError) {
    return { error: error.message, code: error.code, status: error.statusCode };
  }
  return { error: getErrorMessage(error), status: 500 };
}
