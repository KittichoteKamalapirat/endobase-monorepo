import { zodResolver } from "@hookform/resolvers/zod";

import { Control, FieldErrorsImpl, useForm } from "react-hook-form";
import { z } from "zod";
import { InputType } from "../constants/inputType";
import { getActionLabel } from "../utils/getActionStep";
import Button, { HTMLButtonType } from "./Buttons/Button";
import RadioField from "./forms/RadioField";
import TextField, { TextFieldTypes } from "./forms/TextField";
import SmallHeading from "./typography/SmallHeading";
import { ApolloError } from "@apollo/client";
import { Error } from "./skeletons/Error";

export const validateAdminField = (value: string) => {
  if (value !== "Admin") return false;
  return true;
};
interface Props {
  defaultValues: PatientFormValues;
  onSubmit: (data: PatientFormValues) => void;
  containerClass?: string;

  isEditing?: boolean;

  loading?: boolean;
  error?: ApolloError;
}

enum FormNames {
  PATIENT_HN_NUM = "patientHnNum",
  ADMIN_CREDENTIAL = "adminCredential",
  USED_ENDO = "usedEndo",
}

// export interface PatientFormValues {
//   [FormNames.PATIENT_HN_NUM]: string;
//   [FormNames.ADMIN_CREDENTIAL]?: string;
// }

const isCreateSchema = z.object({
  method: z.literal("create"),
  patientHnNum: z
    .string()
    .length(7, { message: "Must be exactly 7 characters long" }),
  usedEndo: z.string(),
});

const isEditSchema = z.object({
  method: z.literal("edit"),
  adminCredential: z.string().refine((value) => value === "Admin", {
    message: "Invalid admin credential",
  }),
  patientHnNum: z
    .string()
    .length(7, { message: "Must be exactly 7 characters long" }),
  usedEndo: z.string(),
});

const schema = z.discriminatedUnion("method", [isCreateSchema, isEditSchema]);
// type CreateFormData = z.infer<typeof isCreateSchema>;
type EditFormData = z.infer<typeof isEditSchema>; // for admin field type
export type PatientFormValues = z.infer<typeof schema>;

const PatientEditor = ({
  defaultValues,
  onSubmit,
  isEditing = false,
  containerClass,
  loading,
  error,
}: Props) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
  } = useForm<PatientFormValues>({
    defaultValues,
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const validatePatientField = (value: string) => {
    if (value.length !== 7) return false;
    return true;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={containerClass}>
      <SmallHeading heading={getActionLabel("patient")} />

      <div className="flex flex-col gap-4">
        <RadioField
          key="patient-usedEndo"
          {...register(FormNames.USED_ENDO, { required: true })}
          options={[
            { value: "true", label: "Use" },
            { value: "false", label: "No Use" },
          ]}
          className="mt-4"
        />

        <TextField
          required
          name={FormNames.PATIENT_HN_NUM}
          control={control as unknown as Control}
          label="Patient Hospital Number (HN)"
          placeholder="Please insert patient ID"
          validation={{
            validate: validatePatientField,
            required: "Invalid HN",
          }}
          type={TextFieldTypes.OUTLINED}
          extraClass="w-full"
          error={errors[FormNames.PATIENT_HN_NUM]}
        />

        {isDirty && isEditing && (
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
            error={(errors as FieldErrorsImpl<EditFormData>).adminCredential}
          />
        )}

        <div className="flex-col gap-4">
          <Button
            label="Save"
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
export default PatientEditor;
