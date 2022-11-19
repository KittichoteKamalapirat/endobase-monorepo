import { Control, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useCreateActionMutation, useSessionQuery } from "../generated/graphql";
import { showToast } from "../redux/slices/toastReducer";
import Button, { HTMLButtonType } from "./Buttons/Button";
import CheckboxField from "./forms/CheckboxField";
import TextField, { TextFieldTypes } from "./forms/TextField";
import SmallHeading from "./typography/SmallHeading";

interface Props {
  containerClass?: string;
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
const CompleteSessionForm = ({ containerClass }: Props) => {
  const { id: sessionId } = useParams();
  const [createAction] = useCreateActionMutation();
  const { refetch } = useSessionQuery({
    variables: { id: sessionId || "" },
  }); // to update cache

  const dispatch = useDispatch();

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<FormValues>({
    defaultValues: initialData,
  });

  const testPassed = !!watch(FormNames.PASSED_TEST);

  const onSubmit = async (data: FormValues) => {
    try {
      if (!sessionId) return;
      const input = {
        sessionId,
        type: "store",
        officerNum: data.officerNum,
        passed: true,
      };

      await createAction({
        variables: {
          input,
        },
      });

      refetch();

      dispatch(
        showToast({
          message: "Session completed",
          variant: "success",
        })
      );
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={containerClass}>
      <SmallHeading heading="Put back to storage and dry" />
      <div>
        <TextField
          required
          name={FormNames.OFFICER_NUM}
          control={control as unknown as Control}
          label="Officer Number"
          placeholder="Please insert officer number"
          type={TextFieldTypes.OUTLINED}
          error={errors[FormNames.OFFICER_NUM]}
        />

        <div className="my-2">
          <CheckboxField
            {...register(FormNames.PASSED_TEST, { required: true })}
            option={{ value: "no need this", label: "Passed" }}
            isChecked={testPassed}
          />
        </div>

        <Button
          label="Save"
          buttonType={HTMLButtonType.SUBMIT}
          extraClass="ml-2.5 w-24"
          disabled={!testPassed}
        />
      </div>
    </form>
  );
};
export default CompleteSessionForm;
