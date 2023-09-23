import ErrorResponse from '../types/error-response.input';

export const getErrorResponse = (
  field: string,
  message: string,
): ErrorResponse => ({
  errors: [
    {
      field,
      message,
    },
  ],
});
