export default class ApiError extends Error {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  headers: Record<string, unknown> | null;

  constructor(
    type: string,
    title: string,
    status: number,
    detail: string,
    instance: string,
    headers: Record<string, unknown> | null = null
  ) {
    super(detail);
    this.type = type;
    this.title = title;
    this.status = status;
    this.detail = detail;
    this.instance = instance;
    this.headers = headers;
  }
}
export class BadRequestError extends ApiError {
  constructor(detail: string, instance: string) {
    super("/errors/bad-request", "Bad Request", 400, detail, instance);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(detail: string, instance: string) {
    super("/errors/unauthorized", "Unauthorized", 401, detail, instance);
  }
}

export class ForbiddenError extends ApiError {
  constructor(detail: string, instance: string) {
    super("/errors/forbidden", "Forbidden", 403, detail, instance);
  }
}
export class MethodNotAllowedError extends ApiError {
  constructor(
    detail: string,
    instance: string,
    headers: Record<string, unknown> | null = null
  ) {
    super(
      "/errors/method-not-allowed",
      "Method Not Allowed",
      405,
      detail,
      instance,
      headers
    );
  }
}

export class ApiResourceNotFoundError extends ApiError {
  constructor(instance: string) {
    super(
      "/errors/resource-not-found",
      "Resource Not Found",
      404,
      `API Resource ${instance} not found`,
      instance
    );
  }
}

export class NotFoundError extends ApiError {
  constructor(detail: string, instance: string) {
    super("/errors/not-found", "Not Found", 404, detail, instance);
  }
}
export class ConflictError extends ApiError {
  constructor(detail: string, instance: string) {
    super("/errors/conflict", "Conflict", 409, detail, instance);
  }
}
export class InternalServerError extends ApiError {
  constructor(detail: string, instance: string) {
    super(
      "/errors/internal-server-error",
      "Internal Server Error",
      500,
      detail,
      instance
    );
  }
}

export class ServiceUnavailableError extends ApiError {
  constructor(detail: string, instance: string) {
    super(
      "/errors/service-unavailable",
      "Service Unavailable",
      503,
      detail,
      instance
    );
  }
}
