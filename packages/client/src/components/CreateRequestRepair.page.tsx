import { useParams } from 'react-router-dom';
import { Endo, useEndoQuery } from '../generated/graphql';
import { useIsAuth } from '../hooks/useIsAuth';
import { useQueryParam } from '../hooks/useQueryParam';
import { ButtonTypes } from './Buttons/Button';
import LinkButton from './Buttons/LinkButton';
import CreateRequestRepairAction from './CreateRequestRepair';
import EndoDetail from './EndoDetail';
import Layout from './layouts/Layout';
import { Error } from './skeletons/Error';
import { Loading } from './skeletons/Loading';




const CreateRequestRepairPage = () => {
  useIsAuth();
  const { id } = useParams();

  const prev = useQueryParam("prev")

  const { data, loading, error } = useEndoQuery({ variables: { id: id || "" } });




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
        <div className="w-full">
          <CreateRequestRepairAction endoId={id} />
        </div>


      </div>


    </Layout>
  );

}
export default CreateRequestRepairPage