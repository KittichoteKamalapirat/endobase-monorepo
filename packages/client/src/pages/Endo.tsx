import { TbNurse } from "react-icons/tb";
import { IoMdBuild } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button, { ButtonTypes } from "../components/Buttons/Button";
import LinkButton from "../components/Buttons/LinkButton";
import EndoDetail from "../components/EndoDetail";
import Layout from "../components/layouts/Layout";
import RepairRequestList from "../components/RepairRequestList";
import { Error } from "../components/skeletons/Error";
import { Loading } from "../components/skeletons/Loading";
import PageHeading from "../components/typography/PageHeading";
import { ICON_SIZE } from "../constants";
import {
  Endo,
  useDeleteEndoMutation,
  useEndoQuery,
  useEndosQuery,
  useFinishRepairMutation,
} from "../generated/graphql";
import { useIsAuth } from "../hooks/useIsAuth";
import { urlResolver } from "../lib/UrlResolver";
import { openConfirm } from "../redux/slices/confirmModalReducer";
import { showToast } from "../redux/slices/toastReducer";
import { primaryColor } from "../theme";
import { ENDO_STATUS } from "../utils/statusToColor";

const EndoPage = () => {
  useIsAuth();
  const { id } = useParams();

  const endoId = id || "";
  const { data, loading, error } = useEndoQuery({ variables: { id: endoId } });

  const status = data?.endo.status;
  const { refetch: refetchEndos } = useEndosQuery();

  const [deleteEndo] = useDeleteEndoMutation();
  const dispatch = useDispatch();
  const [finishRepair] = useFinishRepairMutation();

  const navigate = useNavigate();
  // for back button
  const { state } = useLocation();
  const { prev } = state || {}; // read the prev route

  const handleFinishRepair = async (id: string) => {
    try {
      const result = await finishRepair({
        variables: {
          id,
        },
      });

      const resultValue = result.data?.finishRepair.id;
      if (resultValue) {
        await refetchEndos();
        dispatch(
          showToast({
            message: "Successfully updated the endoscope",
            variant: "success",
          })
        );

        navigate(urlResolver.endos(ENDO_STATUS.FIXED));
        navigate(0);
      } else {
        dispatch(
          showToast({
            message: "An error occured",
            variant: "error",
          })
        );
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleConfirmModal = () =>
    dispatch(
      openConfirm({
        heading: "Are you sure you want to delete this endoscope!",
        content: "This action cannot be undone",
        toPerform: () => handleDelete(),
        ariaLabel: "",
        type: "danger",
      })
    );
  const handleDelete = async () => {
    const result = await deleteEndo({
      variables: { id: id as string },
    });
    const resultValue = result.data?.deleteEndo.value;

    let errorMessage = "";
    const resultUserErrors = result.data?.deleteEndo.errors || [];
    resultUserErrors.map(({ field, message }) => {
      errorMessage += `${field} ${message}\n`;
    });

    // show success or failure
    if (resultValue && resultUserErrors.length === 0) {
      dispatch(
        showToast({
          message: "Successfully Deleted",
          variant: "success",
        })
      );
      await refetchEndos(); // update cache after delete
      navigate(prev ? `${prev}` : "/");
    } else
      dispatch(
        showToast({
          message: errorMessage,
          variant: "error",
        })
      );
  };
  if (loading) {
    return <Loading />;
  }
  if (error || !id) {
    return <Error text={error?.message || "Cannot find the endoscope"} />;
  }

  return (
    <Layout>
      <div>
        <div className="flex  justify-start my-4">
          <LinkButton
            label="Back"
            href={prev ? `${prev}` : "/"}
            type={ButtonTypes.OUTLINED}
          />
        </div>

        <div className="flex items-center justify-between my-4">
          <PageHeading heading="Endoscope Setting" />
          <div className="flex gap-2">
            {data?.endo.status === "out_of_order" ? (
              <Button
                label="Finished Repairing"
                onClick={() => handleFinishRepair(endoId)}
                type={ButtonTypes.OUTLINED}
                startIcon={<IoMdBuild size={ICON_SIZE} color={primaryColor} />}
              />
            ) : (
              <div className="flex gap-2">
                <LinkButton
                  label={`Wait repair ${
                    status === "waiting_for_repair" && "(Current)"
                  }`}
                  href={`${urlResolver.waitRequestRepair(
                    id
                  )}?prev=${urlResolver.endo(id)}`}
                  type={ButtonTypes.OUTLINED}
                  startIcon={
                    <TbNurse size={ICON_SIZE + 4} color={primaryColor} />
                  }
                  disabled={status === "waiting_for_repair"}
                />
                <LinkButton
                  label="Request repair"
                  href={`${urlResolver.requestRepair(
                    id
                  )}?prev=${urlResolver.endo(id)}`}
                  type={ButtonTypes.OUTLINED}
                  startIcon={
                    <IoMdBuild size={ICON_SIZE} color={primaryColor} />
                  }
                />
              </div>
            )}

            <Button
              label="Edit"
              onClick={() => {
                navigate(`/endo/edit/${id}`, {
                  state: { prev: `/endo/${id}` },
                });
              }}
              type={ButtonTypes.OUTLINED}
            />

            <Button
              label="Delete"
              onClick={handleConfirmModal}
              type={ButtonTypes.OUTLINED}
            />
          </div>
        </div>

        <EndoDetail endo={data?.endo as Endo} canBeClicked={false} />
      </div>

      <RepairRequestList endoId={data?.endo.id as string} />
    </Layout>
  );
};
export default EndoPage;
