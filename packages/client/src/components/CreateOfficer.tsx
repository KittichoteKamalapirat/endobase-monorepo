import React from "react";
import { Control, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  useCreateOfficerMutation,
  useOfficersQuery,
} from "../generated/graphql";
import { showToast } from "../redux/slices/toastReducer";
import Button, { HTMLButtonType } from "./Buttons/Button";
import TextField, { TextFieldTypes } from "./forms/TextField";
import SmallHeading from "./typography/SmallHeading";

interface Props {}

interface FormValues {
  officerNum: string;
  firstName: string;
  lastName: string;
}

const initialData: FormValues = {
  officerNum: "",
  firstName: "",
  lastName: "",
};
const CreateOfficer = ({}: Props) => {
  const [createOfficer] = useCreateOfficerMutation();

  const { refetch } = useOfficersQuery();

  const dispatch = useDispatch();

  const onSubmit = async (input: FormValues) => {
    try {
      const result = await await createOfficer({
        variables: {
          input,
        },
      });

      const resultValue = result.data?.createOfficer.officer;

      let errorMessage = "";
      const resultUserErrors = result.data?.createOfficer.errors || [];
      resultUserErrors.map(({ field, message }) => {
        errorMessage += `${field} ${message}\n`;
      });

      // 2. create payment
      if (resultValue && resultUserErrors.length === 0) {
        dispatch(
          showToast({
            message: "Successfully created an officer",
            variant: "success",
          })
        );
        refetch();
      } else {
        dispatch(
          showToast({
            message: errorMessage,
            variant: "error",
          })
        );
      }
    } catch (error) {
      dispatch(
        showToast({
          message: "officer",
          variant: "error",
        })
      );
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SmallHeading heading="Create Officer" />
      <div>
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
          label="Create"
          buttonType={HTMLButtonType.SUBMIT}
          extraClass="w-24 mt-2"
        />
      </div>
    </form>
  );
};
export default CreateOfficer;
