import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  useCreateActionMutation,
  useEndoQuery,
  useSessionQuery,
} from "../../generated/graphql";
import { showToast } from "../../redux/slices/toastReducer";
import { getActionLabel } from "../../utils/getActionStep";
import SmallHeading from "../typography/SmallHeading";
import TakeOutEditor, { TakeOutFormValues } from "./TakeOutEditor";

interface Props {
  isUpdate?: boolean;
  containerClass?: string;
  endoId: string;
  // initialOfficerNum?: string;
  initialValues: TakeOutFormValues;
}

const CreateTakeOutActionForm = ({ initialValues, endoId }: Props) => {
  const { id: sessionId } = useParams();
  const [createAction] = useCreateActionMutation();

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
      };

      const result = await createAction({
        variables: {
          input,
        },
      });

      const resultValue = result.data?.createAction.action;

      let errorMessage = "";
      const resultUserErrors = result.data?.createAction.errors || [];
      resultUserErrors.map(({ field, message }) => {
        errorMessage += `${message}\n`;
      });

      if (resultValue && resultUserErrors.length === 0) {
        dispatch(
          showToast({
            message: "Successfully created an action",
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
          initialValues={{ officerNum: "", note: "", method: "create" }}
          isUpdate={false}
        />
      </div>
    </div>
  );
};
export default CreateTakeOutActionForm;
