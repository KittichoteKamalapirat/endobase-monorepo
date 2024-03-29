import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import EndoEditor, { EndoFormValues } from "../components/EndoEditor";
import Layout from "../components/layouts/Layout";
import {
  CreateEndoInput,
  useCreateEndoMutation,
  useEndosQuery,
} from "../generated/graphql";
import { useIsAuth } from "../hooks/useIsAuth";
import { showToast } from "../redux/slices/toastReducer";

const initialData: EndoFormValues = {
  serialNum: "",
  brand: "",
  type: "",
  model: "",
  tray: null,
};

const CreateEndo = () => {
  useIsAuth();
  const [createEndo] = useCreateEndoMutation();
  const { refetch } = useEndosQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (formInput: EndoFormValues) => {
    const { brand, serialNum, type, model, tray } = formInput;
    const input: CreateEndoInput = {
      trayId: tray?.value as string,
      brand,
      serialNum,
      type,
      model,
      dryingTime: 30, // Not used but just keep it here
    };

    try {
      const result = await createEndo({ variables: { input } });
      if (result.data?.createEndo) {
        await refetch();
        navigate(`/endo/${result.data.createEndo.id}`, {
          state: { prev: "/endo/new" },
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
