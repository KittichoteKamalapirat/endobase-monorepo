import classNames from "classnames";
import { Control, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Patient, useUpdatePatientMutation } from "../generated/graphql";
import { showToast } from "../redux/slices/toastReducer";
import { CARD_CLASSNAMES } from "../theme";
import Button, { HTMLButtonType } from "./Buttons/Button";
import TextField, { TextFieldTypes } from "./forms/TextField";
import SubHeading from "./typography/SubHeading";

interface Props {
  patient: Patient;
}

enum FormNames {
  HOS_NUM = "hosNum",
}

interface FormValues {
  [FormNames.HOS_NUM]: string;
}

const PatientDetail = ({ patient }: Props) => {
  const { hosNum } = patient || {};

  const initialData = {
    hosNum: patient.hosNum,
  };

  const [updatePatient, { loading }] = useUpdatePatientMutation();
  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
    watch,
    register,
  } = useForm<FormValues>({
    defaultValues: initialData,
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    const result = await updatePatient({
      variables: { id: patient.id, input: { hosNum: data.hosNum } },
    });

    const resultValue = result.data?.updatePatient.patient;

    let errorMessage = "";
    const resultUserErrors = result.data?.updatePatient.errors || [];
    resultUserErrors.map(({ field, message }) => {
      errorMessage += `${field} ${message}\n`;
    });

    // show success or failure
    if (resultValue && resultUserErrors.length === 0) {
      dispatch(
        showToast({
          message: "Successfully Updated",
          variant: "success",
        })
      );
    } else
      dispatch(
        showToast({
          message: errorMessage,
          variant: "error",
        })
      );
  };

  if (!patient) return null;

  return (
    <div className={classNames(CARD_CLASSNAMES)}>
      <SubHeading heading="Patient Detail" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-end">
          <TextField
            required
            name={FormNames.HOS_NUM}
            control={control as unknown as Control}
            label="Hospital Number (HN)"
            placeholder="HN1234567"
            type={TextFieldTypes.OUTLINED}
            error={errors[FormNames.HOS_NUM]}
          />

          <Button
            label="Edit"
            buttonType={HTMLButtonType.SUBMIT}
            extraClass="ml-2.5 w-24"
            disabled={!isDirty}
            loading={loading}
          />
        </div>
      </form>
    </div>
  );
};
export default PatientDetail;
