import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  useSessionQuery,
  useUpdateSessionPatientMutation,
} from "../generated/graphql";
import { showToast } from "../redux/slices/toastReducer";
import PatientEditor, { PatientFormValues } from "./PatientEditor";

interface Props {
  disabled: boolean; // if Take Out Form is not completed yet
  className?: string;
}

const defaultValues: PatientFormValues = {
  patientHnNum: "",
  method: "create",
};

const AddPatientForm = ({ disabled, className }: Props) => {
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
      console.error("error", error);
    }
  };
  return (
    <div className={className}>
      <PatientEditor
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        disabled={disabled}
      />
    </div>
  );
};
export default AddPatientForm;
