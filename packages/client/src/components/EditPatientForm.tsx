import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Patient,
  useSessionQuery,
  useUpdateSessionPatientMutation,
} from "../generated/graphql";
import { showToast } from "../redux/slices/toastReducer";
import PatientEditor, { PatientFormValues } from "./PatientEditor";

interface Props {
  disabled: boolean; // if Take Out Form is not completed yet
  className?: string;
  patient: Patient;
}

const EditPatientForm = ({ patient, disabled, className }: Props) => {
  const defaultValues = {
    patientHnNum: patient.hosNum,
  };

  const { id: sessionId } = useParams();
  const { refetch } = useSessionQuery({
    variables: { id: sessionId || "" },
  }); // to update cache

  const dispatch = useDispatch();

  const [updatePatientInSession] = useUpdateSessionPatientMutation();

  const onSubmit = async (data: PatientFormValues) => {
    try {
      if (!sessionId) return;
      if (disabled)
        return dispatch(
          showToast({
            message: "Please fill in the Take Out Form first",
            variant: "success",
          })
        );

      const result = await updatePatientInSession({
        variables: {
          input: {
            id: sessionId,
            patientHN: data.patientHnNum,
          },
        },
      });

      if (result.data?.updateSessionPatient)
        return dispatch(
          showToast({
            message: "Successfully updated the patient",
            variant: "success",
          })
        );
      refetch();
    } catch (error) {
      console.error("error", error);
    }
  };
  return (
    <div className={className}>
      <PatientEditor
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        disabled={disabled}
        isEditing
      />
    </div>
  );
};
export default EditPatientForm;
