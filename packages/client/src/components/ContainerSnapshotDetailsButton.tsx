import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeAlertModal } from "../redux/slices/alertModalReducer";
import Button from "./Buttons/Button";

const ContainerSnapshotDetailsButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
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
};
export default ContainerSnapshotDetailsButton;
