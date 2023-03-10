import { FieldError } from "react-hook-form";

const getErrorMessage = (
  name: string,
  error: FieldError | undefined,
  includedfieldName?: boolean
) => {
  const message = error?.message || "";
  if (message.length > 0) {
    if (includedfieldName) return `${name} ${message}`;
    else return `${message}`;
  }

  return null;
};

export default getErrorMessage;
