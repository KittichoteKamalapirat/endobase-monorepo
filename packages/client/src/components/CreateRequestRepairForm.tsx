import classNames from "classnames";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useCreateRepairRequestMutation,
  useRepairRequestsByEndoQuery,
} from "../generated/graphql";
import { useIsAuth } from "../hooks/useIsAuth";
import { urlResolver } from "../lib/UrlResolver";
import { showToast } from "../redux/slices/toastReducer";
import {
  CRITICAL_CARD_CLASSNAMES,
  UNCLICKABLE_CARD_CLASSNAMES,
} from "../theme";
import RequestRepairEditor, { ActionFormValues } from "./RequestRepairEditor";
import { ApolloError } from "@apollo/client";

export type REPAIR_REQUEST_SRC =
  | "leak_test" // รั่วเลยเรียกช่าง (from session page)
  | "disinfection" // // เฟลเลยเรียกช่าง (from session page)
  | "wait_repair" // เป็นไรไม่รู้ รอช่างมาดู
  | "request_repair"; // ช่างเอากล้องไปแล้ว

interface Props {
  officerNum?: string;
  endoId: string;
  isCritical?: boolean;
  source: REPAIR_REQUEST_SRC;
  isWaitRepairRequest?: boolean; // current status is waiting_for_repair
}

const CreateRequestRepairForm = ({
  officerNum,
  isCritical = false,
  endoId,
  source,
  isWaitRepairRequest = true,
}: Props) => {
  useIsAuth();
  const { refetch } = useRepairRequestsByEndoQuery({ variables: { endoId } });
  const [createRepairRequest, { loading, error }] =
    useCreateRepairRequestMutation();

  const defaultValues = {
    officerNum: officerNum || "",
    passedTest: false,
    note: "",
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const onSubmit = async (data: ActionFormValues) => {
    try {
      const input = {
        endoId,
        officerNum: data.officerNum,
        note: data.note,
        source,
        toBeEndoStatus: isWaitRepairRequest
          ? "waiting_for_repair"
          : "out_of_order",
      };

      const result = await createRepairRequest({
        variables: {
          input,
        },
      });

      const resultValue = result.data?.createRepairRequest.repairRequest;

      let errorMessage = "";
      const resultUserErrors = result.data?.createRepairRequest.errors || [];
      resultUserErrors.map(({ field, message }) => {
        errorMessage += `${message}\n`;
      });

      if (resultValue && resultUserErrors.length === 0) {
        refetch();
        navigate(urlResolver.endo(endoId));
        dispatch(
          showToast({
            message: "Successfully created an repair request",
            variant: "success",
          })
        );
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
      <RequestRepairEditor
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        containerClass={classNames(
          isCritical ? CRITICAL_CARD_CLASSNAMES : UNCLICKABLE_CARD_CLASSNAMES,
          "w-full"
        )}
        isWaitRepairRequest={isWaitRepairRequest}
        loading={loading}
        error={error}
      />
    </div>
  );
};
export default CreateRequestRepairForm;
