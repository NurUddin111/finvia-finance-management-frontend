import { ActionResult } from "@/types/actions";
import { ZodObject } from "zod";

export const zodValidator = <T>(
  payload: T,
  schema: ZodObject,
): ActionResult => {
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

  return {
    success: true,
    data: validatedPayload.data as Record<string, unknown>,
  };
};
