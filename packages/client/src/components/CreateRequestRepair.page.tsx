import { useParams } from "react-router-dom";
import { Endo, useEndoQuery } from "../generated/graphql";
import { useIsAuth } from "../hooks/useIsAuth";
import { useQueryParam } from "../hooks/useQueryParam";
import { ButtonTypes } from "./Buttons/Button";
import LinkButton from "./Buttons/LinkButton";
import CreateRequestRepairForm from "./CreateRequestRepairForm";
import EndoDetail from "./EndoDetail";
import Layout from "./layouts/Layout";
import { Error } from "./skeletons/Error";
import { Loading } from "./skeletons/Loading";

const CreateRequestRepairPage = () => {
  useIsAuth();
  const { id } = useParams();

  const prev = useQueryParam("prev");

  const { data, loading, error } = useEndoQuery({
    variables: { id: id || "" },
  });

  const status = data?.endo.status;

  const isWaitingRepair = status === "waiting_for_repair";

  if (loading) {
    return <Loading />;
  }
  if (error || !id) {
    return <Error text={error?.message || "Cannot find the endoscope"} />;
  }

  return (
    <Layout>
      <div className="flex  justify-start my-4">
        <LinkButton
          label="Back"
          href={prev ? `${prev}` : "/"}
          type={ButtonTypes.OUTLINED}
        />
      </div>
      <div className="flex flex-col-reverse lg:flex-row gap-4">
        <EndoDetail endo={data?.endo as Endo} canBeClicked={false} />
        <div className="w-full">
          <CreateRequestRepairForm
            source="request_repair"
            endoId={id}
            isWaitRepairRequest={false}
          />
        </div>
      </div>
    </Layout>
  );
};
export default CreateRequestRepairPage;
