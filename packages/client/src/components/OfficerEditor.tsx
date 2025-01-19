import { Control, useForm, UseFormSetError } from "react-hook-form";
import Button, { HTMLButtonType } from "./Buttons/Button";
import RadioField from "./forms/RadioField";
import TextField, { TextFieldTypes } from "./forms/TextField";
import {
  OFFICER_TYPE_VALUES,
  officerTypeOptions,
} from "../utils/officerTypeToLabel";
import FormFieldLabel from "./forms/FormFieldLabel";
import { Error } from "./skeletons/Error";
import { ApolloError } from "@apollo/client";

export enum FormNames {
  OFFICER_NUM = "officerNum",
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  OFFICER_TYPE = "type",
}

export interface FormValues {
  officerNum: string;
  firstName: string;
  lastName: string;
  type: OFFICER_TYPE_VALUES;
}

interface Props {
  isUpdate?: boolean;
  defaultValues: FormValues;
  onSubmitRHF: (
    data: FormValues,
    setError: UseFormSetError<FormValues>
  ) => void;
  loading?: boolean;
  error?: ApolloError;
}

const OfficerEditor = ({
  defaultValues,
  isUpdate = false,
  onSubmitRHF,
  loading,
  error,
}: Props) => {
  const {
    control,
    handleSubmit,
    register,
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
      <div className="flex flex-col items-start gap-2">
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

        <div className="mt-2">
          <FormFieldLabel label="Officer Type" />
          <RadioField
            {...register(FormNames.OFFICER_TYPE, { required: true })}
            options={officerTypeOptions}
          />
        </div>
      </div>

      <div className="flex-col gap-4">
        <Button
          label={isUpdate ? "Update" : "Create"}
          buttonType={HTMLButtonType.SUBMIT}
          extraClass="w-36 mt-8"
          loading={loading}
        />
        {error && <Error text={error.message} />}
      </div>
    </form>
  );
};
export default OfficerEditor;
