import { useParams } from "react-router-dom";
import ActivityItem from "../components/ActivityItem";
import CompleteSessionForm from "../components/CompleteSessionForm";
import DisinfectForm from "../components/DisinfectForm";
import EndoDetail from "../components/EndoDetail";
import Layout from "../components/layouts/Layout";
import LeakTestForm from "../components/LeakTestForm";
import PatientForm from "../components/PatientForm";
import { Error } from "../components/skeletons/Error";
import { Loading } from "../components/skeletons/Loading";
import PageHeading from "../components/typography/PageHeading";
import SubHeading from "../components/typography/SubHeading";
import { Action, useSessionQuery } from "../generated/graphql";

const Session = () => {
  const { id } = useParams();

  const sessionId = id || "";
  const { data, loading, error } = useSessionQuery({
    variables: { id: sessionId },
  });

  const { patientId, actions } = data?.session || {};
  console.log("error", error);

  console.log("data", data?.session);

  const leakTestAction = actions?.find(
    (action) => action.type === "leak_test_and_prewash"
  );
  const disinfectAction = actions?.find(
    (action) => action.type === "disinfect"
  );
  const storeAction = actions?.find((action) => action.type === "store");

  if (loading)
    return (
      <Layout>
        <Loading isFullPage={true} />
      </Layout>
    );

  if (error)
    return (
      <Layout>
        <Error text={error?.message} />
      </Layout>
    );

  return (
    <Layout>
      <PageHeading heading="Session" />
      <SubHeading heading="Endoscope" />

      <EndoDetail />

      <div>
        {patientId ? (
          <div>HN : {patientId}</div>
        ) : (
          <PatientForm containerClass="my-4" />
        )}

        <SubHeading heading="Activities" extraClass="mt-4" />

        {leakTestAction ? (
          <ActivityItem action={leakTestAction as Partial<Action>} />
        ) : (
          <LeakTestForm containerClass="my-4" />
        )}
        {disinfectAction ? (
          <ActivityItem action={disinfectAction as Partial<Action>} />
        ) : (
          <DisinfectForm containerClass="my-4" />
        )}
        {storeAction ? (
          <ActivityItem action={storeAction as Partial<Action>} />
        ) : (
          <CompleteSessionForm containerClass="my-4" />
        )}
      </div>
    </Layout>
  );
};
export default Session;
