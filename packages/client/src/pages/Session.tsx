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
import SmallHeading from "../components/typography/SmallHeading";
import { getActionLabel } from "../utils/getActionStep";

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

  const leakTestActions = actions?.filter(
    (action) => action.type === "leak_test_and_prewash"
  );
  const hasLeakTestActions = leakTestActions && leakTestActions.length > 0;

  const bringToWashingRoomActions = actions?.filter(
    (action) => action.type === "bring_to_washing_room"
  );

  const hasBringToWashingRoomAction =
    bringToWashingRoomActions && bringToWashingRoomActions.length > 0;

  const disinfectActions = actions?.filter(
    (action) => action.type === "disinfect"
  );

  const hasDisinfectActions = disinfectActions && disinfectActions.length > 0;

  const storeAction = actions?.find((action) => action.type === "store");

  const dispatch = useDispatch();

  const noNeedPatient =
    data?.session.endoWasExpired || data?.session.endoWasOutOfOrder;

  // hide if (don't have patient when patient is needed)
  // and no previous actions

  // 2. bring to washing room
  const showBringToWashingRoomSection = takeOutAction;
  const showBringToWashingRoomForm = data?.session.endo.status === "being_used";

  // 3. patient
  const disabledPatientForm =
    noNeedPatient || !(takeOutAction && hasBringToWashingRoomAction);

  // 4. leak test
  const showLeakTestSection =
    (noNeedPatient || patient) && takeOutAction && hasBringToWashingRoomAction;

  const showLeakTestForm = data?.session.endo.status === "in_washing_room";

  // 5. disinfect
  const showDisinfectionSection =
    (noNeedPatient || patient) &&
    takeOutAction &&
    hasBringToWashingRoomAction &&
    hasLeakTestActions;

  const showDisinfectionForm = data?.session.endo.status === "leak_test_passed";

  const disabledCompleteSessionForm =
    (!noNeedPatient && !patient) ||
    !(
      takeOutAction &&
      hasBringToWashingRoomAction &&
      hasLeakTestActions &&
      hasDisinfectActions
    );

  // 6. store
  const showCompleteForm = Boolean(
    actions?.find((action) => action.type === "disinfect" && action.passed)
  );

  useEffect(() => {
    if (
      !loading &&
      !error &&
      !takeOutAction &&
      !hasLeakTestActions &&
      !hasDisinfectActions &&
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
    hasDisinfectActions,
    dispatch,
    error,
    takeOutAction,
    hasLeakTestActions,
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
        {/* 1. Take Out */}

        <TakeoutFormWrapper
          className="my-4"
          endoId={endoData?.endo.id || ""}
          routeOfficerNum={officerNum}
          action={takeOutAction}
        />

        {/* 2 Bring to Washing Room*/}
        {showBringToWashingRoomSection && (
          <div>
            <SmallHeading heading={getActionLabel("bring_to_washing_room")} />
            {bringToWashingRoomActions?.map((action, index) => (
              <ActivityItem
                key={`bring-to-washing-room-action-${index}`}
                action={action as Partial<Action>}
                showHeading={false}
                showPassed={false}
              />
            ))}

            {showBringToWashingRoomForm && (
              <BringToWashingRoomForm
                className="my-4 "
                refetchEndo={refetchEndo}
              />
            )}
          </div>
        )}

        {/* 3 Patient Form*/}

        {data?.session.endoWasExpired || data?.session.endoWasOutOfOrder ? (
          takeOutAction &&
          hasBringToWashingRoomAction && (
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

        {/* 4 Leak Test*/}
        {showLeakTestSection && (
          <div>
            <SmallHeading
              heading={getActionLabel("leak_test_and_prewash")}
              extraClass="mt-8"
            />
            {leakTestActions?.map((action, index) => (
              <ActivityItem
                key={`leak-test-action-${index}`}
                action={action as Partial<Action>}
                showHeading={false}
              />
            ))}
            {showLeakTestForm && (
              <LeakTestForm
                containerClass="my-4"
                endoId={data?.session.endoId!}
                refetchEndo={refetchEndo}
              />
            )}
          </div>
        )}

        {/* 5 Disinfect */}
        {showDisinfectionSection && (
          <div>
            <SmallHeading
              heading={getActionLabel("disinfect")}
              extraClass="mt-8"
            />
            {disinfectActions?.map((action, index) => (
              <ActivityItem
                key={`leak-test-action-${index}`}
                action={action as Partial<Action>}
                showHeading={false}
              />
            ))}

            {showDisinfectionForm && (
              <DisinfectForm
                containerClass="my-4"
                endoId={data?.session.endoId!}
                refetchEndo={refetchEndo}
              />
            )}
          </div>
        )}

        {/* 6 */}
        {storeAction ? (
          <ActivityItem action={storeAction as Partial<Action>} />
        ) : (
          showCompleteForm && (
            <CompleteSessionForm
              containerClass="my-4"
              refetchEndo={refetchEndo}
              endo={endoData?.endo as Endo}
              disabled={disabledCompleteSessionForm} // actually no need this because it's won't be shown anyway
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
