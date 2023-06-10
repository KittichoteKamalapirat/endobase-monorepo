import { ApolloQueryResult } from "@apollo/client";
import { Control, useForm } from "react-hook-form";
import { TbBulb } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ICON_SIZE } from "../constants";
import {
  Endo,
  EndoQuery,
  Exact,
  useBlinkLocationMutation,
  useCreateActionMutation,
  useEndosQuery,
  useSessionQuery,
  useWashWithoutStoringMutation,
} from "../generated/graphql";
import { showToast } from "../redux/slices/toastReducer";
import { primaryColor } from "../theme";
import { getActionLabel } from "../utils/getActionStep";
import { ENDO_STATUS, ENDO_STATUS_VALUES } from "../utils/statusToColor";
import Button, { ButtonTypes, HTMLButtonType } from "./Buttons/Button";
import CheckboxField from "./forms/CheckboxField";
import TextField, { TextFieldTypes } from "./forms/TextField";
import SmallHeading from "./typography/SmallHeading";

interface Props {
  containerClass?: string;
  endo: Endo;
  disabled: boolean; // if Leak Test and Prewash and Disinfect form are not filled in
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
  passedTest: false,
};
const CompleteSessionForm = ({
  endo,
  refetchEndo,
  containerClass,
  disabled,
}: Props) => {
  const { id: sessionId } = useParams();
  const [washWithoutStoring] = useWashWithoutStoringMutation();
  const [createAction] = useCreateActionMutation();
  const [blinkLocation] = useBlinkLocationMutation();
  const { refetch: refetchEndos } = useEndosQuery();
  const navigate = useNavigate();
  const { refetch, data } = useSessionQuery({
    variables: { id: sessionId || "" },
  }); // to update cache

  const dispatch = useDispatch();

  const handleBlinkLocation = (status: ENDO_STATUS_VALUES) => {
    blinkLocation({
      variables: {
        input: { col: endo.tray.container.col, row: endo.tray.row, status },
      },
    });
  };

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    watch,
    setError,
  } = useForm<FormValues>({
    defaultValues: initialData,
  });

  const handleUseWithoutStoring = async (id: string) => {
    try {
      const result = await washWithoutStoring({ variables: { id } });

      const sessionId = result.data?.washWithoutStoring.id;
      await refetchEndos();
      navigate(`/session/${sessionId}`, {
        state: { prev: "/" },
      });
    } catch (error) {
      dispatch(
        showToast({
          message: "An error occured!",
          variant: "error",
        })
      );
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (disabled)
      return setError("officerNum", {
        type: "custom",
        message: "Please fill in the Disinfection form first",
      });
    try {
      if (!sessionId) return;
      const input = {
        sessionId,
        type: "store",
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

      dispatch(
        showToast({
          message: "Session completed",
          variant: "success",
        })
      );
      handleBlinkLocation(ENDO_STATUS.READY);
    } catch (error) {
      console.error("error", error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={containerClass}>
      <SmallHeading heading={getActionLabel("store")} />
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

        {/* <div className="my-2">
          <CheckboxField
            {...register(FormNames.PASSED_TEST, { required: true })}
            option={{ value: "no need this", label: "Passed" }}
            isChecked={testPassed}
          />
        </div> */}

        <div className="flex gap-2 mt-4">
          {/* <Button
            label="Blink location"
            buttonType={HTMLButtonType.BUTTON}
            type={ButtonTypes.OUTLINED}
            onClick={() => handleBlinkLocation("ready")}
            startIcon={<TbBulb color={primaryColor} size={ICON_SIZE + 10} />}
          /> */}

          {data?.session.endoId && (
            <Button
              label="Use Again"
              buttonType={HTMLButtonType.BUTTON}
              disabled={!isValid}
              type={ButtonTypes.OUTLINED}
              onClick={() => handleUseWithoutStoring(data.session.endoId)}
            />
          )}

          <Button
            label="Save"
            buttonType={HTMLButtonType.SUBMIT}
            disabled={!isValid}
          />
        </div>
      </div>
    </form>
  );
};
export default CompleteSessionForm;
