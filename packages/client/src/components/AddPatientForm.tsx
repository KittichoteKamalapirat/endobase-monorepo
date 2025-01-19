import { useParams } from "react-router-dom";
import {
  useSessionQuery,
  useUpdateSessionPatientMutation,
} from "../generated/graphql";
import PatientEditor, { PatientFormValues } from "./PatientEditor";

interface Props {
  className?: string;
}

const defaultValues: PatientFormValues = {
  patientHnNum: "",
  method: "create",
  usedEndo: "true",
};

const AddPatientForm = ({ className }: Props) => {
  const { id: sessionId } = useParams();
  const { refetch } = useSessionQuery({
    variables: { id: sessionId || "" },
  }); // to update cache

  const [updatePatientInSession, { loading, error }] =
    useUpdateSessionPatientMutation();

  const onSubmit = async (data: PatientFormValues) => {
    try {
      if (!sessionId) return;

      await updatePatientInSession({
        variables: {
          input: {
            id: sessionId,
            patientHN: data.patientHnNum,
            patientUsedEndo: data.usedEndo === "true" ? true : false,
          },
        },
      });

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
        loading={loading}
        error={error}
      />
    </div>
  );
};
export default AddPatientForm;
