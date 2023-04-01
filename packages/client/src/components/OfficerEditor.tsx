import { Control, useForm, UseFormSetError } from "react-hook-form";
import Button, { HTMLButtonType } from "./Buttons/Button";
import TextField, { TextFieldTypes } from "./forms/TextField";
import SmallHeading from "./typography/SmallHeading";

export enum FormNames {
  OFFICER_NUM = "officerNum",
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
}

export interface FormValues {
  officerNum: string;
  firstName: string;
  lastName: string;

}

interface Props {
  isUpdate?: boolean
  defaultValues: FormValues;
  onSubmitRHF: (
    data: FormValues,
    setError: UseFormSetError<FormValues>
  ) => void;
}

const OfficerEditor = ({ defaultValues, isUpdate = false, onSubmitRHF }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    defaultValues,
  });

  const onSubmit = (data: FormValues) => onSubmitRHF(data, setError);

  // const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
  //   formHandler(data, setError, setGenericErrorMessage);
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-start gap-2">
        <TextField
          required
          name="officerNum"
          control={control as unknown as Control}
          label="Officer Number"
          placeholder="Officer Number"
          type={TextFieldTypes.OUTLINED}
          error={errors.officerNum}
        />

        <TextField
          required
          name="firstName"
          control={control as unknown as Control}
          label="First name"
          placeholder="First Name"
          type={TextFieldTypes.OUTLINED}
          error={errors.firstName}
        />

        <TextField
          required
          name="lastName"
          control={control as unknown as Control}
          label="Last Name"
          placeholder="Last Name"
          type={TextFieldTypes.OUTLINED}
          error={errors.lastName}
        />
      </div>
      <Button
        label={isUpdate ? "Update" : "Create"}
        buttonType={HTMLButtonType.SUBMIT}
        extraClass="w-24 mt-2"
      />
    </form>
  );
};
export default OfficerEditor;
