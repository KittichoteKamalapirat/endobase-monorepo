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
  className?: string;
  patient: Patient;
  patientUsedEndo: boolean;
}

const EditPatientForm = ({
  patient,

  patientUsedEndo,
  className,
}: Props) => {
  const defaultValues: PatientFormValues = {
    patientHnNum: patient.hosNum,
    method: "edit",
    adminCredential: "" as any, // TODO: fix type casting
    usedEndo: patientUsedEndo ? "true" : "false",
  };

  const { id: sessionId } = useParams();
  const { refetch } = useSessionQuery({
    variables: { id: sessionId || "" },
  }); // to update cache

  const dispatch = useDispatch();

  const [updatePatientInSession, { loading, error }] =
    useUpdateSessionPatientMutation();

  const onSubmit = async (data: PatientFormValues) => {
    try {
      if (!sessionId) return;

      const result = await updatePatientInSession({
        variables: {
          input: {
            id: sessionId,
            patientHN: data.patientHnNum,
            patientUsedEndo: data.usedEndo === "true" ? true : false,
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
        isEditing
        loading={loading}
        error={error}
      />
    </div>
  );
};
export default EditPatientForm;
