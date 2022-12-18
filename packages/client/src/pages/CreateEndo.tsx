import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import EndoEditor, { EndoFormValues } from "../components/EndoEditor";
import Layout from "../components/layouts/Layout";
import { CreateEndoInput, useCreateEndoMutation } from "../generated/graphql";
import { useIsAuth } from "../hooks/useIsAuth";
import { showToast } from "../redux/slices/toastReducer";

const initialData: EndoFormValues = {
  serialNum: "",
  brand: "",
  type: "",
  model: "",
  dryingTime: "",
  tray: null,
};

const CreateEndo = () => {
  useIsAuth();
  const [createEndo] = useCreateEndoMutation();
  const navigate = useNavigate();
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
      const result = await createEndo({ variables: { input } });
      if (result.data?.createEndo) {
        navigate(`/endo/${result.data.createEndo.id}`, {
          state: { prev: "endo/new" },
        });

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
    <Layout>
      <EndoEditor onSubmit={onSubmit} initialData={initialData} />
    </Layout>
  );
};
export default CreateEndo;
