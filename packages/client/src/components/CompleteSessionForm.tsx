import { ApolloQueryResult } from "@apollo/client";
import { Control, useForm } from "react-hook-form";
import { TbBulb } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { ICON_SIZE } from "../constants";
import {
  Endo,
  EndoQuery,
  Exact,
  useBlinkLocationMutation,
  useCreateActionMutation,
  useSessionQuery,
} from "../generated/graphql";
import { showToast } from "../redux/slices/toastReducer";
import { primaryColor } from "../theme";
import { ENDO_STATUS_Keys, ENDO_STATUS_VALUES } from "../utils/statusToColor";
import Button, { ButtonTypes, HTMLButtonType } from "./Buttons/Button";
import { endoColumns } from "./EndosTable/endoColumns";
import CheckboxField from "./forms/CheckboxField";
import TextField, { TextFieldTypes } from "./forms/TextField";
import SmallHeading from "./typography/SmallHeading";

interface Props {
  containerClass?: string;
  endo: Endo
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
const CompleteSessionForm = ({ endo, refetchEndo, containerClass }: Props) => {
  const { id: sessionId } = useParams();
  const [createAction] = useCreateActionMutation();
  const [blinkLocation] = useBlinkLocationMutation()
  const { refetch } = useSessionQuery({
    variables: { id: sessionId || "" },
  }); // to update cache

  const dispatch = useDispatch();

  const handleBlinkLocation = (status: ENDO_STATUS_VALUES) => {
    blinkLocation({
      variables: {
        input: { col: endo.tray.container.col, row: endo.tray.row, status }
      }
    })
  }

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
      refetchEndo();
      dispatch(
        showToast({
          message: "Session completed",
          variant: "success",
        })
      );
      handleBlinkLocation("drying")
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

        <div className="flex gap-2">
          <Button
            label="Blink location"
            buttonType={HTMLButtonType.BUTTON}
            type={ButtonTypes.OUTLINED}
            onClick={() => handleBlinkLocation("ready")}
            startIcon={<TbBulb
              color={primaryColor}
              size={ICON_SIZE + 10}
            />}
          />

          <Button
            label="Save"
            buttonType={HTMLButtonType.SUBMIT}
            disabled={!testPassed}
          />

        </div>

      </div>
    </form>
  );
};
export default CompleteSessionForm;
