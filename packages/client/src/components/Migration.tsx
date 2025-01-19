import { useDispatch } from "react-redux";
import Button, { ButtonTypes } from "./Buttons/Button";
import {
  useDeleteAllDataMutation,
  usePopulateAllDataMutation,
} from "../generated/graphql";
import { showToast } from "../redux/slices/toastReducer";
import { Error } from "./skeletons/Error";

const Migration = () => {
  const dispatch = useDispatch();
  const [deleteAllData, { loading: deleteAllLoading, error: deleteAllError }] =
    useDeleteAllDataMutation();
  const [
    populateAllData,
    { loading: populateAllLoading, error: populateAllError },
  ] = usePopulateAllDataMutation();
  const handleDeleteAllData = async () => {
    try {
      const result = await deleteAllData();
      if (result.data?.deleteAllData) {
        dispatch(
          showToast({
            message: "Successfully Deleted",
            variant: "success",
          })
        );
      } else {
        dispatch(
          showToast({
            message: "An error occured",
            variant: "error",
          })
        );
      }
    } catch (error) {
      dispatch(
        showToast({
          message: "An error occured",
          variant: "error",
        })
      );
    }
  };

  const handlePopulateData = async () => {
    try {
      const result = await populateAllData();
      if (result.data?.populateAllData) {
        dispatch(
          showToast({
            message: "Successfully Created",
            variant: "success",
          })
        );
      } else {
        dispatch(
          showToast({
            message: "An error occured",
            variant: "error",
          })
        );
      }
    } catch (error) {
      dispatch(
        showToast({
          message: "An error occured",
          variant: "error",
        })
      );
    }
  };
  return (
    <div className="flex gap-2 mt-4">
      <div className="flex-col gap-2">
        <Button
          label="Delete all data"
          type={ButtonTypes.SECONDARY}
          onClick={handleDeleteAllData}
          loading={deleteAllLoading}
        />
        {deleteAllError && <Error text={deleteAllError.message} />}
      </div>
      <div className="flex-col gap-2">
        <Button
          label="Populate data"
          onClick={handlePopulateData}
          loading={populateAllLoading}
        />
        {populateAllError && <Error text={populateAllError.message} />}
      </div>
    </div>
  );
};

export default Migration;
