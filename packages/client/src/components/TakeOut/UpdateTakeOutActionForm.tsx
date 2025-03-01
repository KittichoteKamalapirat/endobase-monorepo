import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  useEndoQuery,
  useSessionQuery,
  useUpdateActionMutation,
} from "../../generated/graphql";
import { showToast } from "../../redux/slices/toastReducer";
import { getActionLabel } from "../../utils/getActionStep";
import SmallHeading from "../typography/SmallHeading";
import TakeOutEditor, { TakeOutFormValues } from "./TakeOutEditor";

interface Props {
  endoId: string;
  actionId: string; // initialOfficerNum?: string;
  initialValues: TakeOutFormValues;
}

const UpdateTakeOutActionForm = ({
  initialValues,
  actionId,
  endoId,
}: Props) => {
  const { id: sessionId } = useParams();
  const [updateAction, { loading, error }] = useUpdateActionMutation();

  const { refetch } = useSessionQuery({
    variables: { id: sessionId || "" },
  });

  const { refetch: refetchEndo } = useEndoQuery({
    variables: { id: endoId },
  });

  const dispatch = useDispatch();
  const onSubmit = async (data: TakeOutFormValues) => {
    try {
      if (!sessionId) return;
      const input = {
        sessionId,
        type: "take_out",
        officerNum: data.officerNum,

        note: data.note,
      };

      const result = await updateAction({
        variables: {
          input: { ...input, id: actionId },
        },
      });

      const resultValue = result.data?.updateAction.action;

      let errorMessage = "";
      const resultUserErrors = result.data?.updateAction.errors || [];
      resultUserErrors.map(({ field, message }) => {
        errorMessage += `${message}\n`;
      });

      if (resultValue && resultUserErrors.length === 0) {
        dispatch(
          showToast({
            message: "Successfully updated an action",
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
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div>
      <SmallHeading heading={getActionLabel("take_out")} />
      <div className="flex flex-col gap-4">
        <TakeOutEditor
          onSubmit={onSubmit}
          initialValues={{
            ...initialValues,
            method: "update",
            adminCredential: "" as any, // TODO: fix type casting
          }}
          isUpdate
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};
export default UpdateTakeOutActionForm;
