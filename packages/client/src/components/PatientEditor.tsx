import { zodResolver } from "@hookform/resolvers/zod";

import { Control, useForm } from "react-hook-form";
import { z } from "zod";
import { InputType } from "../constants/inputType";
import { getActionLabel } from "../utils/getActionStep";
import Button, { HTMLButtonType } from "./Buttons/Button";
import TextField, { TextFieldTypes } from "./forms/TextField";
import SmallHeading from "./typography/SmallHeading";

interface Props {
  defaultValues: PatientFormValues;
  onSubmit: (data: PatientFormValues) => void;
  containerClass?: string;
  disabled: boolean; // if Take Out Form is not completed yet
  isEditing?: boolean;
}

enum FormNames {
  PATIENT_HN_NUM = "patientHnNum",
  ADMIN_CREDENTIAL = "adminCredential",
}

export interface PatientFormValues {
  [FormNames.PATIENT_HN_NUM]: string;
  [FormNames.ADMIN_CREDENTIAL]?: string;
}

const schema = z.object({
  adminCredential: z.string().refine(
    (value) => {
      console.log("adminvalue", value);
      return typeof value == "undefined" || value === "Admin";
    },
    {
      message: "Invalid admin credential",
    }
  ),
  patientHnNum: z
    .string()
    .length(7, { message: "Must be exactly 7 characters long" }),
});

const PatientEditor = ({
  defaultValues,
  onSubmit,
  isEditing = false,
  containerClass,
  disabled,
}: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    watch,
  } = useForm<PatientFormValues>({
    defaultValues,
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  console.log("watch", watch());

  const validateAdminField = (value: string) => {
    if (value !== "Admin") return false;
    return true;
  };

  const validatePatientField = (value: string) => {
    if (value.length !== 7) return false;
    return true;
  };

  console.log("errors", errors);
  console.log("isValid", isValid);
  console.log("isDirty", isDirty);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={containerClass}>
      <SmallHeading heading={getActionLabel("patient")} />

      <div className="flex flex-col md:flex-row md:items-center gap-4 items-end">
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
            error={errors[FormNames.ADMIN_CREDENTIAL]}
          />
        )}

        <Button
          label="Save"
          buttonType={HTMLButtonType.SUBMIT}
          extraClass="ml-2.5 w-24"
          disabled={disabled || !isDirty || !isValid}
        />
      </div>
    </form>
  );
};
export default PatientEditor;
