import { getInputFieldError, IInputErrorState } from "@/lib/getInputFieldError";
import { FieldDescription } from "../ui/field";

interface InputFieldErrorProps {
  field: string;
  state: IInputErrorState;
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
