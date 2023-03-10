import { useEffect } from "react";
import { useDispatch } from "react-redux";
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
import TakeOutForm from "../components/TakeOutForm";
import PageHeading from "../components/typography/PageHeading";
import {
  Action,
  Endo,
  Patient,
  useEndoQuery,
  useSessionQuery,
} from "../generated/graphql";
import { useIsAuth } from "../hooks/useIsAuth";
import { showToast } from "../redux/slices/toastReducer";
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

  const takeOutAction = actions?.find(
    (action) => action.type === "take_out" && action.passed
  );

  const leakTestAction = actions?.find(
    (action) => action.type === "leak_test_and_prewash" && action.passed
  );
  const disinfectAction = actions?.find(
    (action) => action.type === "disinfect" && action.passed
  );
  const storeAction = actions?.find((action) => action.type === "store");

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !loading &&
      !error &&
      !takeOutAction &&
      !leakTestAction &&
      !disinfectAction &&
      !storeAction
    ) {
      dispatch(
        showToast({
          message: "Please fill in your Officer Number",
          variant: "success",
        })
      );
    }
  }, [
    disinfectAction,
    dispatch,
    error,
    takeOutAction,
    leakTestAction,
    loading,
    storeAction,
  ]);

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
          extraClass="min-w-24"
        />
      </div>

      <PageHeading heading="Session" />
      <EndoDetail endo={endoData?.endo as Endo} canBeClicked />

      <div className={CARD_CLASSNAMES}>
        {/* 1 */}
        {takeOutAction ? (
          <ActivityItem action={takeOutAction as Partial<Action>} />
        ) : (
          <TakeOutForm containerClass="my-4" refetchEndo={refetchEndo} />
        )}
        {/* 2 */}

        {data?.session.endoWasExpired ? (
          <NoPatientForm />
        ) : (
          <div id="patient-details">
            {patientId ? (
              <PatientDetail patient={patient as Patient} />
            ) : (
              <PatientForm containerClass="my-4" disabled={!takeOutAction} />
            )}
          </div>
        )}

        {/* 3 */}
        {leakTestAction ? (
          <ActivityItem action={leakTestAction as Partial<Action>} />
        ) : (
          <LeakTestForm
            containerClass="my-4"
            refetchEndo={refetchEndo}
            disabled={!(takeOutAction && patient)}
          />
        )}
        {/* 4 */}
        {disinfectAction ? (
          <ActivityItem action={disinfectAction as Partial<Action>} />
        ) : (
          <DisinfectForm
            containerClass="my-4"
            refetchEndo={refetchEndo}
            disabled={!(patient && takeOutAction && leakTestAction)}
          />
        )}
        {/* 5 */}
        {storeAction ? (
          <ActivityItem action={storeAction as Partial<Action>} />
        ) : (
          <CompleteSessionForm
            containerClass="my-4"
            refetchEndo={refetchEndo}
            endo={endoData?.endo as Endo}
            disabled={!(takeOutAction && leakTestAction && disinfectAction)}
          />
        )}
      </div>

      <div className="flex justify-center my-4">
        <LinkButton
          label="Back"
          href={prev ? `${prev}` : "/"}
          type={ButtonTypes.OUTLINED}
          extraClass="min-w-24"
        />
      </div>
    </Layout>
  );
};
export default Session;
