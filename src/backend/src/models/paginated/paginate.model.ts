import Joi from "joi";

// Define the PaginationRequest schema
export const PaginationRequestSchema = Joi.object({
  pageSize: Joi.number().integer().min(1).default(10),
  pageIndex: Joi.number().integer().min(0).default(0),
}).options({ stripUnknown: true });

export interface IPaginationRequest {
  pageSize: number;
  pageIndex: number;
}

// Define the PaginatedItems model
export interface IPaginatedItems<T> {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: T[];
}

export class PaginatedItems<T> implements IPaginatedItems<T> {
  constructor(
    public pageIndex: number,
    public pageSize: number,
    public count: number,
    public data: T[]
  ) {}
}
