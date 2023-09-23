import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import ActivityItem from "../components/ActivityItem";
import AddPatientForm from "../components/AddPatientForm";
import BringToWashingRoomForm from "../components/BringToWashingRoomForm";
import { ButtonTypes } from "../components/Buttons/Button";
import LinkButton from "../components/Buttons/LinkButton";
import CompleteSessionForm from "../components/CompleteSessionForm";
import DisinfectForm from "../components/DisinfectForm";
import EditPatientForm from "../components/EditPatientForm";
import EndoDetail from "../components/EndoDetail";
import LeakTestForm from "../components/LeakTestForm";
import NoPatientForm from "../components/NoPatientForm";
import TakeoutFormWrapper from "../components/TakeOut/TakeoutFormWrapper";
import Layout from "../components/layouts/Layout";
import { Error } from "../components/skeletons/Error";
import { Loading } from "../components/skeletons/Loading";
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
  const { prev, officerNum } = state || {}; // read the prev route

  const sessionId = id || "";

  const { data, loading, error } = useSessionQuery({
    variables: { id: sessionId },
    skip: !sessionId,
  });

  const {
    data: endoData,
    loading: endoLoading,
    error: endoError,
    refetch: refetchEndo,
  } = useEndoQuery({
    variables: { id: data?.session.endoId || "" },
    skip: !data?.session.endoId,
  });

  const { actions, patient } = data?.session || {};

  const takeOutAction = actions?.find((action) => action.type === "take_out");

  const bringToWashingRoomAction = actions?.find(
    (action) => action.type === "bring_to_washing_room"
  );

  const leakTestAction = actions?.find(
    (action) => action.type === "leak_test_and_prewash" && action.passed
  );
  const disinfectAction = actions?.find(
    (action) => action.type === "disinfect" && action.passed
  );
  const storeAction = actions?.find((action) => action.type === "store");

  const dispatch = useDispatch();

  const noNeedPatient =
    data?.session.endoWasExpired || data?.session.endoWasOutOfOrder;

  // hide if (don't have patient when patient is needed)
  // and no previous actions
  const disabledBringToWashingRoom = !takeOutAction;
  const disabledPatientForm =
    noNeedPatient || !(takeOutAction && bringToWashingRoomAction);

  const disabledLeakTestForm =
    (!noNeedPatient && !patient) ||
    !(takeOutAction && bringToWashingRoomAction);
  const disabledDisinfectionForm =
    (!noNeedPatient && !patient) ||
    !(takeOutAction && bringToWashingRoomAction && leakTestAction);
  const disabledCompleteSessionForm =
    (!noNeedPatient && !patient) ||
    !(
      takeOutAction &&
      bringToWashingRoomAction &&
      leakTestAction &&
      disinfectAction
    );

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
        {/* {takeOutAction ? (
          <ActivityItem action={takeOutAction as Partial<Action>} />
        ) : (
          <TakeOutForm
            containerClass="my-4"
            refetchEndo={refetchEndo}
            // initialOfficerNum={officerNum}
            initialValues={{ officerNum, note: "" }}
          />
        )} */}

        <TakeoutFormWrapper
          className="my-4"
          endoId={endoData?.endo.id || ""}
          routeOfficerNum={officerNum}
          action={takeOutAction}
        />

        {/* 1 */}
        {bringToWashingRoomAction ? (
          <ActivityItem action={bringToWashingRoomAction as Partial<Action>} />
        ) : (
          !disabledBringToWashingRoom && (
            <BringToWashingRoomForm
              containerClass="my-4"
              refetchEndo={refetchEndo}
              disabled={disabledBringToWashingRoom}
            />
          )
        )}

        {/* 2 */}

        {data?.session.endoWasExpired || data?.session.endoWasOutOfOrder ? (
          takeOutAction &&
          bringToWashingRoomAction && (
            <NoPatientForm wasExpired={data.session.endoWasExpired} />
          )
        ) : (
          <div id="patient-details">
            {patient ? (
              <EditPatientForm
                patient={patient as Patient}
                className="my-4"
                disabled={disabledPatientForm}
                patientUsedEndo={Boolean(data?.session.patientUsedEndo)}
              />
            ) : (
              !disabledPatientForm && (
                <AddPatientForm
                  className="my-4"
                  disabled={disabledPatientForm}
                />
              )
            )}
          </div>
        )}

        {/* 3 */}
        {leakTestAction ? (
          <ActivityItem action={leakTestAction as Partial<Action>} />
        ) : (
          !disabledLeakTestForm && (
            <LeakTestForm
              containerClass="my-4"
              endoId={data?.session.endoId!}
              refetchEndo={refetchEndo}
              disabled={disabledLeakTestForm}
            />
          )
        )}
        {/* 4 */}
        {disinfectAction ? (
          <ActivityItem action={disinfectAction as Partial<Action>} />
        ) : (
          !disabledDisinfectionForm && (
            <DisinfectForm
              containerClass="my-4"
              refetchEndo={refetchEndo}
              disabled={disabledDisinfectionForm}
            />
          )
        )}
        {/* 5 */}
        {storeAction ? (
          <ActivityItem action={storeAction as Partial<Action>} />
        ) : (
          !disabledCompleteSessionForm && (
            <CompleteSessionForm
              containerClass="my-4"
              refetchEndo={refetchEndo}
              endo={endoData?.endo as Endo}
              disabled={disabledCompleteSessionForm}
            />
          )
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
