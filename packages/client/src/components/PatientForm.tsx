import { Control, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  useSessionQuery,
  useUpdateSessionPatientMutation,
} from "../generated/graphql";
import Button, { HTMLButtonType } from "./Buttons/Button";
import TextField, { TextFieldTypes } from "./forms/TextField";
import SmallHeading from "./typography/SmallHeading";

interface Props {
  containerClass?: string;
  disabled: boolean; // if Take Out Form is not completed yet
}

enum FormNames {
  PATIENT_HN_NUM = "patientHnNum",
}

interface FormValues {
  [FormNames.PATIENT_HN_NUM]: string;
}

const initialData = {
  patientHnNum: "",
};
const PatientForm = ({ containerClass, disabled }: Props) => {
  const { id: sessionId } = useParams();
  const { refetch } = useSessionQuery({
    variables: { id: sessionId || "" },
  }); // to update cache
  const [updatePatientInSession] = useUpdateSessionPatientMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    defaultValues: initialData,
  });

  const onSubmit = async (data: FormValues) => {
    try {
      if (!sessionId) return;

      if (disabled)
        return setError("patientHnNum", {
          type: "custom",
          message: "Please fill in the Take Out Form first",
        });

      await updatePatientInSession({
        variables: {
          input: {
            id: sessionId,
            patientHN: data.patientHnNum,
          },
        },
      });

      refetch();
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={containerClass}>
      <SmallHeading heading="2. Who used this endoscope?" />

      <div className="flex items-end">
        <TextField
          required
          name={FormNames.PATIENT_HN_NUM}
          control={control as unknown as Control}
          label="Patient Hospital Number (HN)"
          placeholder="Please insert patient ID"
          type={TextFieldTypes.OUTLINED}
          extraClass="w-full"
          error={errors[FormNames.PATIENT_HN_NUM]}
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
export default PatientForm;
