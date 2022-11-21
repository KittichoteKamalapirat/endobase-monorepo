import { TbBulbOff, TbBulb } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { showToast } from "../../redux/slices/toastReducer";
import Button, { ButtonTypes } from "../Buttons/Button";
import { fromPromise } from "@apollo/client";
import { grey300, primaryColor } from "../../theme";
import { ICON_SIZE } from "../../constants";
import {
  useTurnLightsOffMutation,
  useTurnLightsOnMutation,
} from "../../generated/graphql";

interface Props {
  row: any;
}
const ContainerActionColumn = ({ row }: Props) => {
  const [turnLightsOn] = useTurnLightsOnMutation();
  const [turnLightsOff] = useTurnLightsOffMutation();

  const containerId = row.original.id as string;

  const lightsAreOn = row.original.lightsAreOn;

  const dispatch = useDispatch();

  const handleToggleLights = () => {
    if (lightsAreOn) handleTurnLightsOff();
    else handleTurnLightsOn();
  };

  const handleTurnLightsOn = async () => {
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

  return (
    <div className="flex gap-2">
      <Button
        label="" // currently off
        onClick={handleToggleLights}
        startIcon={
          <TbBulb
            color={!lightsAreOn ? grey300 : primaryColor}
            size={ICON_SIZE + 10}
          />
        }
        type={ButtonTypes.TEXT}
        extraClass="hover:scale-125"
      />
    </div>
  );
};

export default ContainerActionColumn;
