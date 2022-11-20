import React from "react";
import { useDispatch } from "react-redux";
import EndoEditor, { EndoFormValues } from "../components/EndoEditor";
import Layout from "../components/layouts/Layout";
import PageHeading from "../components/typography/PageHeading";
import { CreateEndoInput, useCreateEndoMutation } from "../generated/graphql";
import { showToast } from "../redux/slices/toastReducer";

interface Props {}

const initialData: EndoFormValues = {
  serialNum: "",
  brand: "",
  type: "",
  model: "",
  dryingTime: "",
  tray: null,
};

const CreateEndo = ({}: Props) => {
  const [createEndo] = useCreateEndoMutation();
  const dispatch = useDispatch();
  const onSubmit = async (formInput: EndoFormValues) => {
    const { brand, serialNum, type, model, dryingTime, tray } = formInput;
    const input: CreateEndoInput = {
      trayId: tray?.value as string,
      brand,
      serialNum,
      type,
      model,
      dryingTime: Number(dryingTime),
    };

    try {
      await createEndo({ variables: { input } });
      dispatch(
        showToast({
          message: "Successfully Created",
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
  return (
    <Layout>
      <EndoEditor onSubmit={onSubmit} initialData={initialData} />
    </Layout>
  );
};
export default CreateEndo;
