import { ActionResult } from "@/types/actions";

export const getInputFieldError = (
  fieldName: string,
  state: ActionResult<unknown> | null, // unknown — doesn't care about data shape
): string | null => {
  if (!state?.errors) return null;
  const error = state.errors.find((err) => err.field === fieldName);
  return error ? error.message : null;
};
