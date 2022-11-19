import { useParams } from "react-router-dom";
import ActivityItem from "../components/ActivityItem";
import CompleteSessionForm from "../components/CompleteSessionForm";
import DisinfectForm from "../components/DisinfectForm";
import EndoDetail from "../components/EndoDetail";
import Layout from "../components/layouts/Layout";
import LeakTestForm from "../components/LeakTestForm";
import PatientDetail from "../components/PatientDetail";
import PatientForm from "../components/PatientForm";
import { Error } from "../components/skeletons/Error";
import { Loading } from "../components/skeletons/Loading";
import PageHeading from "../components/typography/PageHeading";
import SubHeading from "../components/typography/SubHeading";
import {
  Action,
  Endo,
  Patient,
  useEndoQuery,
  useSessionQuery,
} from "../generated/graphql";
import { CARD_CLASSNAMES } from "../theme";

const Session = () => {
  const { id } = useParams();

  const sessionId = id || "";
  const { data, loading, error } = useSessionQuery({
    variables: { id: sessionId },
  });

  const {
    data: endoData,
    loading: endoLoading,
    error: endoError,
  } = useEndoQuery({ variables: { id: data?.session.endoId || "" } });

  const { patientId, actions, patient } = data?.session || {};

  const leakTestAction = actions?.find(
    (action) => action.type === "leak_test_and_prewash" && action.passed
  );
  const disinfectAction = actions?.find(
    (action) => action.type === "disinfect" && action.passed
  );
  const storeAction = actions?.find((action) => action.type === "store");

  if (loading || endoLoading)
    return (
      <Layout>
        <Loading isFullPage={true} />
      </Layout>
    );

  if (error || endoError)
    return (
      <Layout>
        <Error
          text={error?.message || endoError?.message || "An error occured"}
        />
      </Layout>
    );

  return (
    <Layout>
      <PageHeading heading="Session" />
      <EndoDetail endo={endoData?.endo as Endo} />

      <div id="patient-details">
        {patientId ? (
          <PatientDetail patient={patient as Patient} />
        ) : (
          <PatientForm containerClass="my-4" />
        )}
      </div>

      <div id="activities-detail" className={CARD_CLASSNAMES}>
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
