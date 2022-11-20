import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import LinkButton from "../components/Buttons/LinkButton";
import EndoEditor, { EndoFormValues } from "../components/EndoEditor";
import Layout from "../components/layouts/Layout";
import { Error } from "../components/skeletons/Error";
import RowsSkeleton from "../components/skeletons/RowsSkeleton";
import PageHeading from "../components/typography/PageHeading";
import {
  UpdateEndoInput,
  useEndoQuery,
  useUpdateEndoMutation,
} from "../generated/graphql";
import { showToast } from "../redux/slices/toastReducer";

interface Props {}

const EditEndo = ({}: Props) => {
  const { id } = useParams();

  // for back button
  const { state } = useLocation();
  const { prev } = state || {};

  const dispatch = useDispatch();
  const endoId = id || "";
  const { data, loading, error } = useEndoQuery({ variables: { id: endoId } });

  const { serialNum, brand, type, dryingTime, model, tray } = data?.endo || {};

  const initialData: EndoFormValues = {
    serialNum: serialNum || "",
    brand: brand || "",
    type: type || "",
    model: model || "",
    dryingTime: String(dryingTime) || "30",
    tray: { value: tray?.id || "", label: tray?.position || "" },
  };
  const [updateEndo] = useUpdateEndoMutation();

  const onSubmit = async (formInput: EndoFormValues) => {
    const { brand, serialNum, type, model, dryingTime, tray } = formInput;

    const input: UpdateEndoInput = {
      trayId: tray?.value as string,
      brand,
      serialNum,
      type,
      model,
      dryingTime: Number(dryingTime),
    };
    try {
      await updateEndo({ variables: { id: endoId, input } });
      dispatch(
        showToast({
          message: "Successfully Updated",
          variant: "success",
        })
      );
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
      <EndoEditor onSubmit={onSubmit} initialData={initialData} />
    </Layout>
  );
};
export default EditEndo;
