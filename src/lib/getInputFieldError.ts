import { ActionResult } from "@/types/actions";

export const getInputFieldError = (
  fieldName: string,
  state: ActionResult | null,
) => {
  if (state?.errors) {
    const error = state.errors.find((err) => err.field === fieldName);
    return error ? error.message : null;
  }
  return null;
};
