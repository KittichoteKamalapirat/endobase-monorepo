import React from "react";
import { Control, useForm } from "react-hook-form";
import Button, { HTMLButtonType } from "./Buttons/Button";
import TextField, { TextFieldTypes } from "./forms/TextField";
import SmallHeading from "./typography/SmallHeading";

interface Props {
  containerClass?: string;
}

enum FormNames {
  PATIENT_ID = "patientId",
}

interface FormValues {
  [FormNames.PATIENT_ID]: string;
}

const initialData = {
  patientId: "",
};
const PatientForm = ({ containerClass }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: initialData,
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={containerClass}>
      <SmallHeading heading="Previous patient id" />

      <div className="flex items-end">
        <TextField
          required
          name={FormNames.PATIENT_ID}
          control={control as unknown as Control}
          label="Patient ID"
          placeholder="Please insert patient ID"
          type={TextFieldTypes.OUTLINED}
          extraClass="w-full"
          error={errors[FormNames.PATIENT_ID]}
        />
        <Button
          label="Save"
          buttonType={HTMLButtonType.SUBMIT}
          extraClass="ml-2.5 w-24"
        />
      </div>
    </form>
  );
};
export default PatientForm;
