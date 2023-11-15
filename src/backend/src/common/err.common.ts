export default class ApiError extends Error {
//   type?: string;
  statusCode?: number;
  message: string;
  headers?: Record<string, unknown>;

  constructor(
    statusCode: number = 500,
    message: string,
    headers?: Record<string, unknown>,
    // type: string = "unknown"
  ) {
    super(message);
    // this.type = type ?? "";
    this.statusCode = statusCode;
    this.message = message ?? "";
    this.headers = headers ?? {};
  }
}
