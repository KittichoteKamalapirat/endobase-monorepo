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
import SmallHeading from "../components/typography/SmallHeading";
import {
  Action,
  Endo,
  Patient,
  useEndoQuery,
  useSessionQuery,
} from "../generated/graphql";
import { useIsAuth } from "../hooks/useIsAuth";
import { CARD_CLASSNAMES } from "../theme";
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
  // 1. take out
  const takeOutAction = actions?.find((action) => action.type === "take_out");

  const noNeedPatient =
    data?.session.endoWasExpired || data?.session.endoWasOutOfOrder;

  // 2. bring to washing room
  const showBringToWashingRoomSection = takeOutAction;
  const showBringToWashingRoomForm = data?.session.endo.status === "being_used";

  const bringToWashingRoomActions = actions?.filter(
    (action) => action.type === "bring_to_washing_room"
  );

  const hasBringToWashingRoomActions =
    bringToWashingRoomActions && bringToWashingRoomActions.length > 0;

  // 3. patient
  const showPatientSection =
    showBringToWashingRoomSection && hasBringToWashingRoomActions; // no need showPatientForm cause editable

  // 4. leak test
  const showLeakTestSection = showPatientSection && (noNeedPatient || patient);
  const showLeakTestForm = data?.session.endo.status === "in_washing_room";

  const passedLeakTestActions = actions?.filter(
    (action) => action.type === "leak_test_and_prewash" && action.passed
  );
  const leakTestActions = actions?.filter(
    (action) => action.type === "leak_test_and_prewash"
  );
  const hasPassedLeakTestActions =
    passedLeakTestActions && passedLeakTestActions.length > 0;

  // 5. disinfect
  const showDisinfectionSection =
    showLeakTestSection && hasPassedLeakTestActions;

  const disinfectActions = actions?.filter(
    (action) => action.type === "disinfect"
  );
  const passedDisinfectActions = actions?.filter(
    (action) => action.type === "disinfect" && action.passed
  );

  const hasPassedDisinfectActions =
    passedDisinfectActions && passedDisinfectActions.length > 0;

  const showDisinfectionForm = data?.session.endo.status === "leak_test_passed";

  // 6. store
  const storeAction = actions?.find((action) => action.type === "store");

  const showCompleteForm = showDisinfectionSection && hasPassedDisinfectActions;
  const disabledCompleteSessionForm =
    (!noNeedPatient && !patient) ||
    !(
      takeOutAction &&
      hasBringToWashingRoomActions &&
      hasPassedLeakTestActions &&
      hasPassedDisinfectActions
    );

  // useEffect(() => {
  //   if (
  //     !loading &&
  //     !error &&
  //     !takeOutAction &&
  //     !hasLeakTestActions &&
  //     !hasDisinfectActions &&
  //     !storeAction
  //   ) {
  //     dispatch(
  //       showToast({
  //         message: "Please fill in your Officer Number",
  //         variant: "success",
  //       })
  //     );
  //   }
  // }, [
  //   hasDisinfectActions,
  //   dispatch,
  //   error,
  //   takeOutAction,
  //   hasLeakTestActions,
  //   loading,
  //   storeAction,
  // ]);

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

        {showPatientSection &&
          (data?.session.endoWasExpired || data?.session.endoWasOutOfOrder ? (
            takeOutAction &&
            hasBringToWashingRoomActions && (
              <NoPatientForm wasExpired={data.session.endoWasExpired} />
            )
          ) : (
            <div id="patient-details">
              {patient ? (
                <EditPatientForm
                  patient={patient as Patient}
                  className="my-4"
                  patientUsedEndo={Boolean(data?.session.patientUsedEndo)}
                />
              ) : (
                <AddPatientForm className="my-4" />
              )}
            </div>
          ))}

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
