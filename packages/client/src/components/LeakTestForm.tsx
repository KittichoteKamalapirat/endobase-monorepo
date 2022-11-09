import React from "react";
import { Control, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useCreateActionMutation, useSessionQuery } from "../generated/graphql";
import Button, { HTMLButtonType } from "./Buttons/Button";
import TextField, { TextFieldTypes } from "./forms/TextField";
import SmallHeading from "./typography/SmallHeading";

interface Props {
  containerClass?: string;
}

enum FormNames {
  OFFICER_NUM = "officerNum",
}

interface FormValues {
  [FormNames.OFFICER_NUM]: string;
}

const initialData = {
  officerNum: "",
};
const LeakTestForm = ({ containerClass }: Props) => {
  const { id: sessionId } = useParams();
  const [createAction] = useCreateActionMutation();

  const { refetch } = useSessionQuery({
    variables: { id: sessionId || "" },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: initialData,
  });

  const onSubmit = async (data: FormValues) => {
    try {
      if (!sessionId) return;
      const input = {
        sessionId,
        type: "leak_test_and_prewash",
        officerNum: data.officerNum,
        passed: true,
      };

      const result = await createAction({
        variables: {
          input,
        },
      });

      refetch();
      console.log("result", result);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={containerClass}>
      <SmallHeading heading="Leak Test" />
      <div className="flex w-full items-end">
        <TextField
          required
          name={FormNames.OFFICER_NUM}
          control={control as unknown as Control}
          label="Officer ID"
          placeholder="Please insert officer ID"
          type={TextFieldTypes.OUTLINED}
          error={errors[FormNames.OFFICER_NUM]}
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
export default LeakTestForm;
