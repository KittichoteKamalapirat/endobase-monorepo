import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  useSettingsQuery,
  useSubscribeToOverHumOrTempSubscription,
} from "../generated/graphql";
import { openAlertModal } from "../redux/slices/alertModalReducer";

const SubscribeToOverHumOrTemp = () => {
  const {
    data: settingsData,
    loading: settingsLoading,
    error: settingsError,
  } = useSettingsQuery();

  console.log("settingsData", settingsData);
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

          content = `The humidity is over ${humThresNum} and the temperature is over ${tempThresNum}.`;
        } else if (currHumNum > humThresNum) {
          heading = `Humidity exceeds at container ${container.col}!`;

          content = `The humidity is detected to be over the expected value of ${humThresNum}.`;
        } else if (currTempNum > tempThresNum) {
          heading = `Temperature exceeds at container ${container.col}!`;

          content = `The temperature is detected to be over the expected value of ${tempThresNum}.`;
        }
      };
      anonymous();

      dispatch(
        openAlertModal({
          heading,
          content,
          type: "danger",
          ariaLabel: "",
          actionsType: "containerSnapshot",
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
