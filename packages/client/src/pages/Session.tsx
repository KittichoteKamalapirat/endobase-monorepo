import { useLocation, useParams } from "react-router-dom";
import ActivityItem from "../components/ActivityItem";
import { ButtonTypes } from "../components/Buttons/Button";
import LinkButton from "../components/Buttons/LinkButton";
import CompleteSessionForm from "../components/CompleteSessionForm";
import DisinfectForm from "../components/DisinfectForm";
import EndoDetail from "../components/EndoDetail";
import Layout from "../components/layouts/Layout";
import LeakTestForm from "../components/LeakTestForm";
import NoPatientForm from "../components/NoPatientForm";
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
import { useIsAuth } from "../hooks/useIsAuth";
import { CARD_CLASSNAMES } from "../theme";

const Session = () => {
  useIsAuth();
  const { id } = useParams();

  // for back button
  const { state } = useLocation();
  const { prev } = state || {}; // read the prev route

  const sessionId = id || "";
  const { data, loading, error } = useSessionQuery({
    variables: { id: sessionId },
  });

  const {
    data: endoData,
    loading: endoLoading,
    error: endoError,
    refetch: refetchEndo,
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
      <div className="flex justify-start my-4">
        <LinkButton
          label="Back"
          href={prev ? `${prev}` : "/"}
          type={ButtonTypes.OUTLINED}
        />
      </div>

      <PageHeading heading="Session" />
      <EndoDetail endo={endoData?.endo as Endo} canBeClicked />

      {data?.session.endoWasExpired ? (
        <NoPatientForm />
      ) : (
        <div id="patient-details">
          {patientId ? (
            <PatientDetail patient={patient as Patient} />
          ) : (
            <PatientForm containerClass="my-4" />
          )}
        </div>
      )}

      <div id="activities-detail" className={CARD_CLASSNAMES}>
        <SubHeading heading="Activities" extraClass="mt-4" />

        {leakTestAction ? (
          <ActivityItem action={leakTestAction as Partial<Action>} />
        ) : (
          <LeakTestForm containerClass="my-4" refetchEndo={refetchEndo} />
        )}
        {disinfectAction ? (
          <ActivityItem action={disinfectAction as Partial<Action>} />
        ) : (
          <DisinfectForm containerClass="my-4" refetchEndo={refetchEndo} />
        )}
        {storeAction ? (
          <ActivityItem action={storeAction as Partial<Action>} />
        ) : (
          <CompleteSessionForm
            containerClass="my-4"
            refetchEndo={refetchEndo}
          />
        )}
      </div>
    </Layout>
  );
};
export default Session;
