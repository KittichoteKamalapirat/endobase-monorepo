import { ApolloQueryResult } from "@apollo/client";
import { useEffect } from "react";
import { Control, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  EndoQuery,
  Exact,
  useCreateActionMutation,
  useSessionQuery,
} from "../generated/graphql";
import Button, { HTMLButtonType } from "./Buttons/Button";
import TextField, { TextFieldTypes } from "./forms/TextField";
import SmallHeading from "./typography/SmallHeading";

interface Props {
  containerClass?: string;
  refetchEndo: (
    variables?:
      | Partial<
          Exact<{
            id: string;
          }>
        >
      | undefined
  ) => Promise<ApolloQueryResult<EndoQuery>>;
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
const TakeOutForm = ({ refetchEndo, containerClass }: Props) => {
  const { id: sessionId } = useParams();
  const [createAction] = useCreateActionMutation();

  const { refetch } = useSessionQuery({
    variables: { id: sessionId || "" },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<FormValues>({
    defaultValues: initialData,
  });

  const onSubmit = async (data: FormValues) => {
    try {
      if (!sessionId) return;
      const input = {
        sessionId,
        type: "take_out",
        officerNum: data.officerNum,
        passed: true,
      };

      await createAction({
        variables: {
          input,
        },
      });

      refetch();
      refetchEndo();
    } catch (error) {
      console.log("error", error);
    }
  };

  // This form only shows when it's empty
  // If it's empty => mean that it's redirected from "Pick" button
  useEffect(() => {
    setFocus("officerNum");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={containerClass}>
      <SmallHeading heading="Take Out" />
      <div className="flex items-end">
        <TextField
          required
          name={FormNames.OFFICER_NUM}
          control={control as unknown as Control}
          label="Officer Number"
          placeholder="Please insert officer number"
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
export default TakeOutForm;
