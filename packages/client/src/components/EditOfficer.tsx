import { UseFormSetError } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  useOfficerQuery,
  useOfficersQuery,
  useUpdateOfficerMutation,
} from "../generated/graphql";
import { urlResolver } from "../lib/UrlResolver";
import { showToast } from "../redux/slices/toastReducer";
import OfficerEditor, { FormValues } from "./OfficerEditor";
import { Error } from "./skeletons/Error";
import { Loading } from "./skeletons/Loading";
import SmallHeading from "./typography/SmallHeading";
import { OFFICER_TYPE_VALUES } from "../utils/officerTypeToLabel";

const EditOfficer = () => {
  const { id } = useParams();
  const { data, loading, error } = useOfficerQuery({
    variables: { id: id || "" },
  });

  const [updateOfficer] = useUpdateOfficerMutation();

  const { refetch } = useOfficersQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const defaultValues: FormValues = {
    officerNum: data?.officer.officerNum as string,
    firstName: data?.officer.firstName as string,
    lastName: data?.officer.lastName as string,
    type: data?.officer.type as OFFICER_TYPE_VALUES,
  };

  const onSubmit = async (
    input: FormValues,
    setError: UseFormSetError<FormValues>
  ) => {
    try {
      if (!id) return;
      const result = await updateOfficer({
        variables: {
          input: {
            id,
            ...input,
          },
        },
      });

      const resultValue = result.data?.updateOfficer.officer;

      let errorMessage = "";
      const resultUserErrors = result.data?.updateOfficer.errors || [];
      resultUserErrors.map(({ field, message }) => {
        errorMessage += `${field} ${message}\n`;
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

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error text={error?.message} />;
  }

  return (
    <div>
      <SmallHeading heading="Update Officer" />
      <OfficerEditor
        onSubmitRHF={onSubmit}
        defaultValues={defaultValues}
        isUpdate
      />
    </div>
  );
};
export default EditOfficer;
