export interface ActionResult {
  success: boolean;
  data?: Record<string, unknown>;
  message?: string;
  error?: string;
  errors?: { field: string; message: string }[];
}
