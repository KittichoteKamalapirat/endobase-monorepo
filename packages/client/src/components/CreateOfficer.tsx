import { UseFormSetError } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useCreateOfficerMutation,
  useOfficersQuery,
} from "../generated/graphql";
import { urlResolver } from "../lib/UrlResolver";
import { showToast } from "../redux/slices/toastReducer";
import OfficerEditor, { FormValues } from "./OfficerEditor";
import SmallHeading from "./typography/SmallHeading";

const defaultValues: FormValues = {
  officerNum: "",
  firstName: "",
  lastName: "",
};
const CreateOfficer = () => {
  const [createOfficer] = useCreateOfficerMutation();

  const { refetch } = useOfficersQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (
    input: FormValues,
    setError: UseFormSetError<FormValues>
  ) => {
    try {
      const result = await await createOfficer({
        variables: {
          input,
        },
      });

      const resultValue = result.data?.createOfficer.officer;

      let errorMessage = "";
      const resultUserErrors = result.data?.createOfficer.errors || [];
      resultUserErrors.map(({ field, message }) => {
        errorMessage += `${field} ${message}\n`;
        // if field is key of FormValues
        if (field in defaultValues) {
          setError(field as any, {
            type: "custom",
            message,
          });
        }
      });

      // 2. create payment
      if (resultValue && resultUserErrors.length === 0) {
        dispatch(
          showToast({
            message: "Successfully created an officer",
            variant: "success",
          })
        );
        refetch();
        navigate(urlResolver.admin());
      } else {
        dispatch(
          showToast({
            message: errorMessage,
            variant: "error",
          })
        );
      }
    } catch (error) {
      dispatch(
        showToast({
          message: "officer",
          variant: "error",
        })
      );
    }
  };

  return (
    <div>
      <SmallHeading heading="Create Officer" />
      <OfficerEditor onSubmitRHF={onSubmit} defaultValues={defaultValues} isUpdate={false} />
    </div>
  );
};
export default CreateOfficer;
