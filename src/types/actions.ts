export interface IPaginationMeta {
  total: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  availableYears?: number[];
}

export interface ActionResult<T = Record<string, unknown>> {
  success: boolean;
  data?: T;
  meta?: IPaginationMeta;
  message?: string;
  error?: string;
  errors?: { field: string; message: string }[];
}
