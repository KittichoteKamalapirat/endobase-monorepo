import { ApolloQueryResult } from "@apollo/client";
import { Control, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  EndoQuery,
  Exact,
  useCreateActionMutation,
  useSessionQuery
} from "../generated/graphql";
import { showToast } from "../redux/slices/toastReducer";
import { getActionLabel } from "../utils/getActionStep";
import Button, { HTMLButtonType } from "./Buttons/Button";
import CreateRequestRepairAction from "./CreateRequestRepair";
import RadioField from "./forms/RadioField";
import TextField, { TextFieldTypes } from "./forms/TextField";
import SmallHeading from "./typography/SmallHeading";
import SubHeading from "./typography/SubHeading";

interface Props {
  containerClass?: string;
  endoId: string
  disabled: boolean; // if Take Out Form is not completed yet
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
  PASSED_TEST = "passedTest",
}

interface FormValues {
  [FormNames.OFFICER_NUM]: string;
  [FormNames.PASSED_TEST]: string | boolean; // if no checked (boolean false), if checked (string true)
}

const initialData = {
  officerNum: "",
  passedTest: false,
};
const LeakTestForm = ({ refetchEndo, containerClass, disabled, endoId }: Props) => {
  const { id: sessionId } = useParams();
  const [createAction] = useCreateActionMutation();

  const { refetch } = useSessionQuery({
    variables: { id: sessionId || "" },
  });

  const {
    control,
    handleSubmit,
    register,
    watch,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: initialData,
  });

  const dispatch = useDispatch();

  const { officerNum, passedTest } = watch()


  const testIsFailing = passedTest === "false";



  const onSubmit = async (data: FormValues) => {
    if (disabled)
      return setError("officerNum", {
        type: "custom",
        message: "Please fill in the Patient Form first",
      });

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

      const resultValue = result.data?.createAction.action;

      let errorMessage = "";
      const resultUserErrors = result.data?.createAction.errors || [];
      resultUserErrors.map(({ field, message }) => {
        errorMessage += `${message}\n`;
      });

      if (resultValue && resultUserErrors.length === 0) {
        dispatch(
          showToast({
            message: "Successfully created an action",
            variant: "success",
          })
        );
        refetch();
        refetchEndo();
      } else {
        dispatch(
          showToast({
            message: errorMessage,
            variant: "error",
          })
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={containerClass}>
        <SmallHeading heading={getActionLabel("leak_test_and_prewash")} />
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
            disabled={testIsFailing}
          />
        </div>
        <div className="mt-2">

          <RadioField
            {...register(FormNames.PASSED_TEST, { required: true })}
            options={[{ value: "true", label: "Passed" }, { value: "false", label: "Failed" }]}
          />
        </div>

      </form>
      {testIsFailing &&
        <div className="mt-4">
          <SubHeading heading="Please fill in the form below" fontColor="text-red" />
          <CreateRequestRepairAction officerNum={officerNum} isCritical endoId={endoId} />
        </div>}

    </div>
  );
};
export default LeakTestForm;
