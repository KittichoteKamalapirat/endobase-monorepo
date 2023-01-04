import { Control, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  useSessionQuery,
  useUpdateSessionPatientMutation,
} from "../generated/graphql";
import { CARD_CLASSNAMES } from "../theme";
import Button, { HTMLButtonType } from "./Buttons/Button";
import TextField, { TextFieldTypes } from "./forms/TextField";
import SmallHeading from "./typography/SmallHeading";

interface Props {
  containerClass?: string;
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
const PatientForm = ({ containerClass }: Props) => {
  const { id: sessionId } = useParams();
  const { refetch } = useSessionQuery({
    variables: { id: sessionId || "" },
  }); // to update cache
  const [updatePatientInSession] = useUpdateSessionPatientMutation();

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
    <div className={CARD_CLASSNAMES}>
      <form onSubmit={handleSubmit(onSubmit)} className={containerClass}>
        <SmallHeading heading="Who used this endoscope?" />

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
    </div>
  );
};
export default PatientForm;
