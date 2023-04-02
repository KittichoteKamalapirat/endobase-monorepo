import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Endo, useCreateRepairRequestMutation, useEndoQuery } from '../generated/graphql';
import { useIsAuth } from '../hooks/useIsAuth';
import { useQueryParam } from '../hooks/useQueryParam';
import { urlResolver } from '../lib/UrlResolver';
import { showToast } from '../redux/slices/toastReducer';
import { UNCLICKABLE_CARD_CLASSNAMES } from '../theme';
import { ButtonTypes } from './Buttons/Button';
import LinkButton from './Buttons/LinkButton';
import EndoDetail from './EndoDetail';
import Layout from './layouts/Layout';
import RequestRepairEditor, { ActionFormValues } from './RequestRepairEditor';
import { Error } from './skeletons/Error';
import { Loading } from './skeletons/Loading';

interface Props {

}

const defaultValues = {
  officerNum: "",
  passedTest: false,
  note: "",
}
const CreateRequestRepairAction = ({ }: Props) => {
  useIsAuth();
  const [createRepairRequest] = useCreateRepairRequestMutation()
  const { id } = useParams();

  const prev = useQueryParam("prev")


  const endoId = id || "";

  const { data, loading, error } = useEndoQuery({ variables: { id: endoId } });


  const dispatch = useDispatch()

  const navigate = useNavigate()
  const onSubmit = async (data: ActionFormValues) => {


    try {

      const input = {
        endoId: id as string,
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
        navigate(urlResolver.endo(id as string))
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


  if (loading) {
    return <Loading />;
  }
  if (error || !id) {
    return <Error text={error?.message || "Cannot find the endoscope"} />;
  }

  return (
    <Layout >
      <div className="flex  justify-start my-4">
        <LinkButton
          label="Back"
          href={prev ? `${prev}` : "/"}
          type={ButtonTypes.OUTLINED}
        />
      </div>
      <div className="flex gap-4">
        <EndoDetail endo={data?.endo as Endo} canBeClicked={false} />
        <RequestRepairEditor
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          containerClass={classNames(UNCLICKABLE_CARD_CLASSNAMES, "w-full")} />

      </div>


    </Layout>
  );

}
export default CreateRequestRepairAction