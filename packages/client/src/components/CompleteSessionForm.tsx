import React from "react";
import { Control, useForm } from "react-hook-form";
import Button, { HTMLButtonType } from "./Buttons/Button";
import TextField, { TextFieldTypes } from "./forms/TextField";
import SmallHeading from "./typography/SmallHeading";

interface Props {
  containerClass?: string;
}

enum FormNames {
  OFFICER_ID = "officerId",
}

interface FormValues {
  [FormNames.OFFICER_ID]: string;
}

const initialData = {
  officerId: "",
};
const CompleteSessionForm = ({ containerClass }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: initialData,
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={containerClass}>
      <SmallHeading heading="Put back to Storage" />
      <div className="flex w-full items-end">
        <TextField
          required
          name={FormNames.OFFICER_ID}
          control={control as unknown as Control}
          label="Officer ID"
          placeholder="Please insert officer ID"
          type={TextFieldTypes.OUTLINED}
          error={errors[FormNames.OFFICER_ID]}
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
export default CompleteSessionForm;
