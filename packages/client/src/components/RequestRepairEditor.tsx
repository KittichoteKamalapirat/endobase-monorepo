import classNames from "classnames";
import { Control, useForm } from "react-hook-form";
import { IoMdBuild } from "react-icons/io";
import { ICON_SIZE } from "../constants";
import Button, { HTMLButtonType } from "./Buttons/Button";
import TextField, { TextFieldTypes } from "./forms/TextField";
import SmallHeading from "./typography/SmallHeading";
import { Error } from "./skeletons/Error";
import { ApolloError } from "@apollo/client";

interface Props {
  defaultValues: ActionFormValues;
  onSubmit: (data: ActionFormValues) => void;
  containerClass?: string;
  isWaitRepairRequest: boolean;
  loading?: boolean;
  error?: ApolloError;
}

enum FormNames {
  OFFICER_NUM = "officerNum",
  NOTE = "note",
}

export interface ActionFormValues {
  [FormNames.OFFICER_NUM]: string;
  [FormNames.NOTE]: string;
}

const RequestRepairEditor = ({
  isWaitRepairRequest,
  containerClass,
  onSubmit,
  defaultValues,
  loading,
  error,
}: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ActionFormValues>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={containerClass}>
      <div className="flex gap-2 items-center">
        <IoMdBuild color="000" size={ICON_SIZE} />
        <SmallHeading
          heading={isWaitRepairRequest ? "Wait for Repair" : "Request repair"}
        />
      </div>

      <div className={classNames("flex gap-4 mt-4 flex-col items-start")}>
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

        <div className="flex-col gap-4">
          <Button
            label="Save"
            buttonType={HTMLButtonType.SUBMIT}
            extraClass="w-24"
            loading={loading}
          />

          {error && <Error text={error.message} />}
        </div>
      </div>
    </form>
  );
};
export default RequestRepairEditor;
