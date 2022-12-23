import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button, { ButtonTypes } from "../components/Buttons/Button";
import LinkButton from "../components/Buttons/LinkButton";
import EndoDetail from "../components/EndoDetail";
import Layout from "../components/layouts/Layout";
import { Error } from "../components/skeletons/Error";
import { Loading } from "../components/skeletons/Loading";
import PageHeading from "../components/typography/PageHeading";
import {
  Endo,
  useDeleteEndoMutation,
  useEndoQuery,
  useEndosQuery,
} from "../generated/graphql";
import { useIsAuth } from "../hooks/useIsAuth";
import { openConfirm } from "../redux/slices/confirmModalReducer";
import { showToast } from "../redux/slices/toastReducer";

const EndoPage = () => {
  useIsAuth();
  const { id } = useParams();

  const endoId = id || "";
  const { data, loading, error } = useEndoQuery({ variables: { id: endoId } });

  const { refetch } = useEndosQuery();

  const [deleteEndo] = useDeleteEndoMutation();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  // for back button
  const { state } = useLocation();
  const { prev } = state || {}; // read the prev route

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
      await refetch(); // update cache after delete
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
  if (error) {
    return <Error text={error?.message} />;
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
    </Layout>
  );
};
export default EndoPage;
