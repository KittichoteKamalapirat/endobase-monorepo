import { z } from "zod";
import { useEffect } from "react";
import { Control, FieldErrorsImpl, useForm } from "react-hook-form";
import Button, { HTMLButtonType } from "../Buttons/Button";
import TextField, { TextFieldTypes } from "../forms/TextField";
import { validateAdminField } from "../PatientEditor";
import { InputType } from "../../constants/inputType";
import { Error } from "../skeletons/Error";
import { ApolloError } from "@apollo/client";

interface Props {
  onSubmit: (data: TakeOutFormValues) => void;
  initialValues: TakeOutFormValues;
  isUpdate?: boolean; // for cta label
  loading?: boolean;
  error?: ApolloError;
}

enum FormNames {
  OFFICER_NUM = "officerNum",
  NOTE = "note",
  ADMIN_CREDENTIAL = "adminCredential",
}

const createSchema = z.object({
  method: z.literal("create"),
  officerNum: z
    .string()
    .length(7, { message: "Must be exactly 7 characters long" }),

  note: z.string(),
});

const updateSchema = z.object({
  method: z.literal("update"),
  adminCredential: z.string().refine((value) => value === "Admin", {
    message: "Invalid admin credential",
  }),
  officerNum: z
    .string()
    .length(7, { message: "Must be exactly 7 characters long" }),
  note: z.string(),
});

const schema = z.discriminatedUnion("method", [createSchema, updateSchema]);

export type TakeOutFormValues = z.infer<typeof schema>;
type UpdateFormValues = z.infer<typeof updateSchema>; // for admin type assertion

const TakeOutEditor = ({
  initialValues,
  onSubmit,
  isUpdate,
  loading,
  error,
}: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    setFocus,
  } = useForm<TakeOutFormValues>({
    defaultValues: initialValues,
  });

  // This form only shows when it's empty
  // If it's empty => mean that it's redirected from "Pick" button
  useEffect(() => {
    setFocus("officerNum");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <TextField
          required
          name={FormNames.OFFICER_NUM}
          control={control as unknown as Control}
          label="Officer Number"
          placeholder="Please insert officer number"
          type={TextFieldTypes.OUTLINED}
          error={errors[FormNames.OFFICER_NUM]}
        />

        <TextField
          name={FormNames.NOTE}
          control={control as unknown as Control}
          label="Additional Note"
          placeholder="Please add some details"
          type={TextFieldTypes.OUTLINED}
          error={errors[FormNames.NOTE]}
        />

        {isDirty && isUpdate && (
          <TextField
            required
            name={FormNames.ADMIN_CREDENTIAL}
            control={control as unknown as Control}
            label="Admin Credential"
            placeholder="Please insert a credential"
            type={TextFieldTypes.OUTLINED}
            extraClass="w-full"
            validation={{ validate: validateAdminField }}
            inputType={InputType.Password}
            error={
              (errors as FieldErrorsImpl<UpdateFormValues>).adminCredential
            }
          />
        )}

        <div className="flex-col gap-4">
          <Button
            label={isUpdate ? "Update" : "Save"}
            buttonType={HTMLButtonType.SUBMIT}
            extraClass="w-24"
            disabled={!isDirty || !isValid}
            loading={loading}
          />
          {error && <Error text={error.message} />}
        </div>
      </div>
    </form>
  );
};
export default TakeOutEditor;
