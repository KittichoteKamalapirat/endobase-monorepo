import { IoReload } from "react-icons/io5";
import { TbBulb } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { ICON_SIZE } from "../../constants";
import {
  useReconnectContainerMutation,
  useTurnLightsOffMutation,
  useTurnLightsOnMutation,
} from "../../generated/graphql";
import { showToast } from "../../redux/slices/toastReducer";
import { grey300, primaryColor } from "../../theme";
import Button, { ButtonTypes } from "../Buttons/Button";
import Spinner2 from "../Spinner2";

interface Props {
  row: any;
}
const ContainerActionColumn = ({ row }: Props) => {
  const [turnLightsOn, { loading: loadingTurnLightsOn }] =
    useTurnLightsOnMutation();
  const [turnLightsOff, { loading: loadingTurnLightsOff }] =
    useTurnLightsOffMutation();
  const [reconnectContainer, { loading: loadingReconnect }] =
    useReconnectContainerMutation();

  const containerId = row.original.id as string;

  const lightsAreOn = row.original.lightsAreOn;

  const dispatch = useDispatch();

  const handleToggleLights = () => {
    if (lightsAreOn) handleTurnLightsOff();
    else handleTurnLightsOn();
  };

  const handleTurnLightsOn = async () => {
    try {
      if (lightsAreOn) return; // do nothing
      const result = await turnLightsOn({
        variables: { id: containerId },
      });

      const resultValue = result.data?.turnLightsOn.container;

      let errorMessage = "";
      const resultUserErrors = result.data?.turnLightsOn.errors || [];
      resultUserErrors.map(({ field, message }) => {
        errorMessage += `${field} ${message}\n`;
      });

      // show success or failure
      if (resultValue && resultUserErrors.length === 0) {
        dispatch(
          showToast({
            message: "Turned lights on",
            variant: "success",
          })
        );
        // await refetch(); // update cache after delete
      } else
        dispatch(
          showToast({
            message: errorMessage,
            variant: "error",
          })
        );
    } catch (error) {
      console.error("error turn lights on", error);
    }
  };

  const handleTurnLightsOff = async () => {
    if (!lightsAreOn) return; // do nothing
    const result = await turnLightsOff({
      variables: { id: containerId },
    });
    const resultValue = result.data?.turnLightsOff.container;

    let errorMessage = "";
    const resultUserErrors = result.data?.turnLightsOff.errors || [];
    resultUserErrors.map(({ field, message }) => {
      errorMessage += `${field} ${message}\n`;
    });

    // show success or failure
    if (resultValue && resultUserErrors.length === 0) {
      dispatch(
        showToast({
          message: "Turned lights off",
          variant: "success",
        })
      );
      // await refetch(); // update cache after delete
    } else
      dispatch(
        showToast({
          message: errorMessage,
          variant: "error",
        })
      );
  };

  const handleReconnect = async () => {
    try {
      const result = await reconnectContainer({
        variables: { id: containerId },
        refetchQueries: ["Containers"],
      });

      const resultValue = result.data?.reconnectContainer.container;
      const resultErrors = result.data?.reconnectContainer.errors || [];

      if (resultValue && resultErrors.length === 0) {
        dispatch(
          showToast({ message: "Reconnected successfully", variant: "success" })
        );
      } else {
        const errorMessage = resultErrors
          .map(({ field, message }) => `${field} ${message}`)
          .join("\n");
        dispatch(showToast({ message: errorMessage, variant: "error" }));
      }
    } catch (error) {
      console.error("error reconnecting container", error);
    }
  };

  const isActive = row.original.isResponding;
  return (
    <div className="flex gap-2">
      <Button
        label=""
        onClick={handleReconnect}
        startIcon={
          loadingReconnect ? (
            <Spinner2 />
          ) : (
            <IoReload color={primaryColor} size={ICON_SIZE + 6} />
          )
        }
        type={ButtonTypes.TEXT}
        extraClass="hover:scale-125"
      />
      <Button
        label=""
        onClick={handleToggleLights}
        startIcon={
          loadingTurnLightsOff || loadingTurnLightsOn ? (
            <Spinner2 />
          ) : (
            <TbBulb
              color={!lightsAreOn ? grey300 : primaryColor}
              size={ICON_SIZE + 10}
            />
          )
        }
        type={ButtonTypes.TEXT}
        disabled={!isActive}
        extraClass="hover:scale-125"
      />
    </div>
  );
};

export default ContainerActionColumn;
