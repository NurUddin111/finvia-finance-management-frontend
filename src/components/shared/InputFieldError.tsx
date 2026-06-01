import { getInputFieldError } from "@/lib/getInputFieldError";
import { FieldDescription } from "../ui/field";
import { ActionResult } from "@/types/actions";

interface InputFieldErrorProps {
  field: string;
  state: ActionResult<unknown> | null;
}

const InputFieldError = ({ field, state }: InputFieldErrorProps) => {
  const error = getInputFieldError(field, state);

  if (!error) return null;

  return (
    <FieldDescription className="mt-1 text-xs text-red-400">
      {error}
    </FieldDescription>
  );
};

export default InputFieldError;
