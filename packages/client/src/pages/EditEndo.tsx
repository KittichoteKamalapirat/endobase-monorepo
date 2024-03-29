import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import EndoEditor, { EndoFormValues } from "../components/EndoEditor";
import Layout from "../components/layouts/Layout";
import { Error } from "../components/skeletons/Error";
import RowsSkeleton from "../components/skeletons/RowsSkeleton";
import {
  UpdateEndoInput,
  useEndoQuery,
  useUpdateEndoMutation,
} from "../generated/graphql";
import { useIsAuth } from "../hooks/useIsAuth";
import { showToast } from "../redux/slices/toastReducer";

const EditEndo = () => {
  useIsAuth();
  const { id } = useParams();

  const dispatch = useDispatch();
  const endoId = id || "";
  const { data, loading, error } = useEndoQuery({ variables: { id: endoId } });

  const { serialNum, brand, type, model, tray } = data?.endo || {};

  const initialData: EndoFormValues = {
    serialNum: serialNum || "",
    brand: brand || "",
    type: type || "",
    model: model || "",
    tray: { value: tray?.id || "", label: tray?.position || "" },
  };
  const [updateEndo] = useUpdateEndoMutation();
  const navigate = useNavigate();

  const { refetch: refetchEndo } = useEndoQuery({ variables: { id: endoId } });

  const onSubmit = async (formInput: EndoFormValues) => {
    const { brand, serialNum, type, model, tray } = formInput;

    const input: UpdateEndoInput = {
      trayId: tray?.value as string,
      brand,
      serialNum,
      type,
      model,
      dryingTime: 30,
    };
    try {
      const result = await updateEndo({
        variables: { id: endoId, input },
        // have to explicitly update cache bcause the "position" would not get updated
        // because the field resovler "position" is calculated based on endo.tray.row and endo.tray.container.col
        update: () => {
          refetchEndo();
        },
      });

      if (result.data?.updateEndo) {
        navigate(`/endo/${result.data.updateEndo.id}`, {
          state: { prev: `/endo/edit/${result.data.updateEndo.id}` },
        });
        dispatch(
          showToast({
            message: "Successfully Updated",
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

  if (loading) {
    return <RowsSkeleton />;
  }
  if (error) {
    return <Error text={error?.message} />;
  }

  return (
    <Layout>
      <EndoEditor onSubmit={onSubmit} initialData={initialData} isEdit />
    </Layout>
  );
};
export default EditEndo;
