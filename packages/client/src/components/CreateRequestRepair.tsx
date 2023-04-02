import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCreateRepairRequestMutation, useRepairRequestsByEndoQuery } from '../generated/graphql';
import { useIsAuth } from '../hooks/useIsAuth';
import { urlResolver } from '../lib/UrlResolver';
import { showToast } from '../redux/slices/toastReducer';
import { CRITICAL_CARD_CLASSNAMES, UNCLICKABLE_CARD_CLASSNAMES } from '../theme';
import RequestRepairEditor, { ActionFormValues } from './RequestRepairEditor';

interface Props {
  officerNum?: string
  endoId: string
  isCritical?: boolean
}



const CreateRequestRepair = ({ officerNum, isCritical = false, endoId }: Props) => {
  useIsAuth();
  const { refetch } = useRepairRequestsByEndoQuery({ variables: { endoId } })
  const [createRepairRequest] = useCreateRepairRequestMutation()

  const defaultValues = {
    officerNum: officerNum || "",
    passedTest: false,
    note: "",
  }

  const dispatch = useDispatch()

  const navigate = useNavigate()
  const onSubmit = async (data: ActionFormValues) => {
    try {

      const input = {
        endoId,
        officerNum: data.officerNum,
        note: data.note
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
        refetch()
        navigate(urlResolver.endo(endoId))
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
      console.log("error", error);
    }
  };



  return (
    <div>
      <RequestRepairEditor
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        containerClass={classNames(isCritical ? CRITICAL_CARD_CLASSNAMES : UNCLICKABLE_CARD_CLASSNAMES, "w-full")} />

    </div>



  );

}
export default CreateRequestRepair