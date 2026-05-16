import { ZodType } from "zod";
import { ActionResult } from "@/types/actions";

// Separate type — "validated form data", not "API response data"
type ValidatorResult<T> =
  | { success: true; data: T }
  | { success: false; errors: ActionResult["errors"] };

export const zodValidator = <T>(
  payload: unknown,
  schema: ZodType<T>,
): ValidatorResult<T> => {
  const validatedPayload = schema.safeParse(payload);

  if (!validatedPayload.success) {
    return {
      success: false,
      errors: validatedPayload.error.issues.map((issue) => ({
        field: String(issue.path[0]),
        message: issue.message,
      })),
    };
  }

  return { success: true, data: validatedPayload.data };
};
