import { ApolloQueryResult } from "@apollo/client";
import { useEffect } from "react";
import { Control, FieldErrorsImpl, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { z } from "zod";
import {
  EndoQuery,
  Exact,
  useCreateActionMutation,
  useSessionQuery,
} from "../generated/graphql";
import { showToast } from "../redux/slices/toastReducer";
import Button, { HTMLButtonType } from "./Buttons/Button";
import CreateRequestRepairForm from "./CreateRequestRepairForm";
import RadioField from "./forms/RadioField";
import TextField, { TextFieldTypes } from "./forms/TextField";
import { Error } from "./skeletons/Error";
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

export enum LeakTestFormNames {
  OFFICER_NUM = "officerNum",
  PASSED_TEST = "passedTest",
  NOTE = "note",
  FAILED_FEEDBACK = "failedFeedback",
}

const passedSchema = z.object({
  officerNum: z.string(),
  usedEndo: z.string(),
  passedTest: z.literal("true"),
});

const failedSchema = z.object({
  officerNum: z.string(),
  passedTest: z.literal("false"),
  failedFeedback: z.union([
    z.literal("bring_to_washing_room"),
    z.literal("re_leak_test"),
    z.literal("wait_repair"),
  ]),
  note: z.string(),
});

const schema = z.discriminatedUnion("passedTest", [passedSchema, failedSchema]);

export type LeakTestFormValues = z.infer<typeof schema>; // for admin field type
export type FailedLeakTestFormValues = z.infer<typeof failedSchema>; // for admin field type

export const initialLeakTestData = {
  officerNum: "",
  passedTest: "true" as const,
};
const LeakTestForm = ({ refetchEndo, containerClass, endoId }: Props) => {
  const { id: sessionId } = useParams();
  const [createAction, { loading, error }] = useCreateActionMutation();

  const { refetch } = useSessionQuery({
    variables: { id: sessionId || "" },
  });

  const {
    control,
    handleSubmit,
    register,
    watch,
    setFocus,
    formState: { errors, isValid, isDirty },
  } = useForm<LeakTestFormValues>({
    defaultValues: initialLeakTestData,
  });

  const dispatch = useDispatch();

  const { officerNum, passedTest } = watch();

  const testIsFailing = passedTest === "false";
  const isFailedAndWaitRepair =
    testIsFailing && watch("failedFeedback") === "wait_repair";

  const onSubmit = async (data: LeakTestFormValues) => {
    try {
      if (!sessionId) return;

      const isFailed = data.passedTest === "false";

      const input = {
        sessionId,
        type: "leak_test_and_prewash",
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

  useEffect(() => {
    setFocus("officerNum");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            key="leak-test-passed"
            {...register(LeakTestFormNames.PASSED_TEST)}
            options={[
              { value: "true", label: "Passed" },
              { value: "false", label: "Failed" },
            ]}
            className="mt-4"
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
                  { value: "re_leak_test", label: "Re Leak Test" },
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

          <div className="flex-col gap-4">
            <Button
              label="Save"
              buttonType={HTMLButtonType.SUBMIT}
              extraClass="w-24"
              disabled={isFailedAndWaitRepair || !isValid || !isDirty}
              loading={loading}
            />

            {error && <Error text={error.message} />}
          </div>
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
            source="leak_test"
          />
        </div>
      )}
    </div>
  );
};
export default LeakTestForm;
