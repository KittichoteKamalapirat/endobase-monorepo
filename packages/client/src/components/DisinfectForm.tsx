import { ApolloQueryResult } from "@apollo/client";
import { Control, FieldErrorsImpl, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  EndoQuery,
  Exact,
  useCreateActionMutation,
  useSessionQuery,
} from "../generated/graphql";
import { showToast } from "../redux/slices/toastReducer";
import Button, { HTMLButtonType } from "./Buttons/Button";
import CreateRequestRepairForm from "./CreateRequestRepairForm";
import {
  FailedLeakTestFormValues,
  LeakTestFormNames,
  LeakTestFormValues,
  initialLeakTestData,
} from "./LeakTestForm";
import RadioField from "./forms/RadioField";
import TextField, { TextFieldTypes } from "./forms/TextField";
import SubHeading from "./typography/SubHeading";

interface Props {
  containerClass?: string;
  endoId: string;
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

const DisinfectForm = ({ endoId, refetchEndo, containerClass }: Props) => {
  const { id: sessionId } = useParams();
  const [createAction] = useCreateActionMutation();

  const { refetch } = useSessionQuery({
    variables: { id: sessionId || "" },
  }); // to update cache

  const {
    control,
    formState: { errors, isValid, isDirty },
    handleSubmit,
    watch,
    register,
  } = useForm<LeakTestFormValues>({
    defaultValues: initialLeakTestData,
  });

  const { officerNum, passedTest } = watch();

  const testIsFailing = passedTest === "false";

  const isFailedAndWaitRepair =
    testIsFailing && watch("failedFeedback") === "wait_repair";

  const dispatch = useDispatch();

  const onSubmit = async (data: LeakTestFormValues) => {
    try {
      if (!sessionId) return;

      const isFailed = data.passedTest === "false";
      const input = {
        sessionId,
        type: "disinfect",
        officerNum: data.officerNum,
        passed: data.passedTest === "true" ? true : false,
        note: isFailed ? data.note : undefined,
        failedFeedback:
          data.passedTest === "false" ? data.failedFeedback : undefined,
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
      console.error("error", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={containerClass}>
        <div className="flex flex-col gap-4">
          <TextField
            required
            name={LeakTestFormNames.OFFICER_NUM}
            control={control as unknown as Control}
            label="Officer Number"
            placeholder="Please insert officer number"
            type={TextFieldTypes.OUTLINED}
            error={errors[LeakTestFormNames.OFFICER_NUM]}
          />

          <RadioField
            {...register(LeakTestFormNames.PASSED_TEST)}
            options={[
              { value: "true", label: "Passed" },
              { value: "false", label: "Failed" },
            ]}
          />

          {testIsFailing && (
            <>
              <RadioField
                key="leak-test-failedFeedback"
                {...register(LeakTestFormNames.FAILED_FEEDBACK)}
                options={[
                  {
                    value: "bring_to_washing_room",
                    label: "Bring back to the Washing Room",
                  },
                  { value: "re_disinfection", label: "Re Disinfection" },
                  { value: "wait_repair", label: "Wait Repair" },
                ]}
                className="mt-4"
              />
              <TextField
                name={LeakTestFormNames.NOTE}
                control={control as unknown as Control}
                label="Additional Note"
                placeholder="Please add some details"
                type={TextFieldTypes.OUTLINED}
                error={
                  (errors as FieldErrorsImpl<FailedLeakTestFormValues>).note
                }
              />
            </>
          )}

          <Button
            label="Save"
            buttonType={HTMLButtonType.SUBMIT}
            extraClass="w-24"
            disabled={isFailedAndWaitRepair || !isValid || !isDirty}
          />
        </div>
      </form>
      {isFailedAndWaitRepair && (
        <div className="mt-4">
          <SubHeading
            heading="Please fill in the form below"
            fontColor="text-red"
          />
          <CreateRequestRepairForm
            officerNum={officerNum}
            isCritical
            endoId={endoId}
            source="disinfection"
          />
        </div>
      )}
    </div>
  );
};
export default DisinfectForm;
