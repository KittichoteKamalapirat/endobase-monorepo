import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Buttons/Button";
import {
  useSettingsQuery,
  useSubscribeToOverHumOrTempSubscription,
} from "../generated/graphql";
import {
  closeAlertModal,
  openAlertModal,
} from "../redux/slices/alertModalReducer";

const SubscribeToOverHumOrTemp = () => {
  const navigate = useNavigate();
  const {
    data: settingsData,
    loading: settingsLoading,
    error: settingsError,
  } = useSettingsQuery();

  const humThreshold =
    settingsData?.settings.find(
      (setting) => setting.name === "humidityThreshold"
    )?.value || "";
  const tempThreshold =
    settingsData?.settings.find(
      (setting) => setting.name === "temperatureThreshold"
    )?.value || "";

  const {
    data: snapshotData,
    loading: snapshotLoading,
    error: snapshotError,
  } = useSubscribeToOverHumOrTempSubscription({
    variables: { humThreshold, tempThreshold },
  });

  const dispatch = useDispatch();

  const SeeDetailsButton = (
    <Button
      label="See more details"
      onClick={() => {
        navigate(`/containers`, {
          state: { tab: "snapshots" },
        });
        dispatch(closeAlertModal());
      }}
      extraClass="mt-4"
    />
  );
  useEffect(() => {
    if (settingsLoading || snapshotLoading) return;

    if (settingsError || snapshotError) return;

    if (snapshotData?.subscribeToOverHumOrTemp) {
      const { hum, temp, container } = snapshotData?.subscribeToOverHumOrTemp;
      let heading = "";
      let content = null;

      const anonymous = () => {
        const currHumNum = parseFloat(hum);
        const currTempNum = parseFloat(temp);
        const humThresNum = parseFloat(humThreshold);
        const tempThresNum = parseFloat(tempThreshold);
        if (currHumNum > humThresNum && currTempNum > tempThresNum) {
          heading = `Humidity and Temperature exceed at container ${container.col}!`;
          content = (
            <div>
              <p>{`The humidity is over ${humThresNum} and the temperature is over ${tempThresNum}.`}</p>

              {SeeDetailsButton}
            </div>
          );
        } else if (currHumNum > humThresNum) {
          heading = `Humidity exceeds at container ${container.col}!`;
          content = (
            <div>
              <p>{`The humidity is detected to be over the expected value of ${humThresNum}.`}</p>

              {SeeDetailsButton}
            </div>
          );
        } else if (currTempNum > tempThresNum) {
          heading = `Temperature exceeds at container ${container.col}!`;
          content = (
            <div>
              <p>{`The temperature is detected to be over the expected value of ${tempThresNum}.`}</p>

              {SeeDetailsButton}
            </div>
          );
        }
      };
      anonymous();

      dispatch(
        openAlertModal({
          heading,
          content,
          type: "danger",
          ariaLabel: "",
        })
      );
    }
  }, [
    snapshotData,
    dispatch,
    humThreshold,
    tempThreshold,
    settingsError,
    settingsLoading,
    snapshotError,
    snapshotLoading,
  ]);

  return null;
};

export default SubscribeToOverHumOrTemp;
