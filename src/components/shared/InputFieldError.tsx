import { getInputFieldError } from "@/lib/getInputFieldError";
import { FieldDescription } from "../ui/field";
import { ActionResult } from "@/types/actions";

interface InputFieldErrorProps {
  field: string;
  state: ActionResult | null;
}

const InputFieldError = ({ field, state }: InputFieldErrorProps) => {
  const error = getInputFieldError(field, state);

  if (!error) return null;

  return (
    <FieldDescription className="mt-1 text-sm text-red-500">
      {error}
    </FieldDescription>
  );
};

export default InputFieldError;
