import { ApolloQueryResult } from "@apollo/client";
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
import CreateRequestRepairAction from "./CreateRequestRepair";
import RadioField from "./forms/RadioField";
import TextField, { TextFieldTypes } from "./forms/TextField";
import SubHeading from "./typography/SubHeading";
import { useEffect } from "react";

interface Props {
  containerClass?: string;
  endoId: string;
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
  NOTE = "note",
  FAILED_FEEDBACK = "failedFeedback",
}

const passedSchema = z.object({
  officerNum: z.string(),
  usedEndo: z.string(),
  passedTest: z.literal("true"),
});

// const FailedFeebackTypeSchema = z.union([
//   z.literal("bring_to_washing_room"),
//   z.literal("re_leak_test DEPOSIT"),
//   z.literal("wait_repair"),
// ]);

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

type FormValues = z.infer<typeof schema>; // for admin field type
type FailedFormValues = z.infer<typeof failedSchema>; // for admin field type

// interface FormValues {
//   [FormNames.OFFICER_NUM]: string;
//   [FormNames.PASSED_TEST]: string | boolean; // if no checked (boolean false), if checked (string true)
//   [FormNames.FAILED_FEEDBACK]:
//     | "bring_to_washing_room"
//     | "re_leak_test"
//     | "wait_repair";
// }

const initialData = {
  officerNum: "",
  passedTest: "false" as const,
};
const LeakTestForm = ({
  refetchEndo,
  containerClass,
  disabled,
  endoId,
}: Props) => {
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

    setFocus,
    formState: { errors, isValid, isDirty },
  } = useForm<FormValues>({
    defaultValues: initialData,
  });

  const dispatch = useDispatch();

  console.log("watch", watch());
  const { officerNum, passedTest } = watch();
  const isFailedAndWaitRepair =
    passedTest === "false" && watch("failedFeedback") === "wait_repair";

  console.log("watch", watch());
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
        passed: data.passedTest === "true" ? true : false,
        faildFeedback:
          data.passedTest === "false" ? data.failedFeedback : undefined,
      };

      console.log("input", input);
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
            name={FormNames.OFFICER_NUM}
            control={control as unknown as Control}
            label="Officer Number"
            placeholder="Please insert officer number"
            type={TextFieldTypes.OUTLINED}
            error={errors[FormNames.OFFICER_NUM]}
          />

          <RadioField
            key="leak-test-passed"
            {...register(FormNames.PASSED_TEST)}
            options={[
              { value: "true", label: "Passed" },
              { value: "false", label: "Failed" },
            ]}
            className="mt-4"
          />
          {testIsFailing && (
            <RadioField
              key="leak-test-failedFeedback"
              {...register(FormNames.FAILED_FEEDBACK)}
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
          )}

          {testIsFailing && (
            <TextField
              name={FormNames.NOTE}
              control={control as unknown as Control}
              label="Additional Note"
              placeholder="Please add some details"
              type={TextFieldTypes.OUTLINED}
              error={(errors as FieldErrorsImpl<FailedFormValues>).note}
            />
          )}

          <Button
            label="Save"
            buttonType={HTMLButtonType.SUBMIT}
            extraClass="ml-2.5 w-24"
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
          <CreateRequestRepairAction
            officerNum={officerNum}
            isCritical
            endoId={endoId}
          />
        </div>
      )}
    </div>
  );
};
export default LeakTestForm;
