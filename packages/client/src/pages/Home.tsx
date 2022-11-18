import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Buttons/Button";
import EndosTable from "../components/EndosTable";
import Layout from "../components/layouts/Layout";
import { useIsAuth } from "../hooks/useIsAuth";
import { showToast } from "../redux/slices/toastReducer";
import { RootState } from "../redux/store";

const Home = () => {
  const { data, isOpen } = useSelector((state: RootState) => state.alertModal);
  console.log("alert data", data);
  console.log("isOpen", isOpen);
  useIsAuth();

  const dispatch = useDispatch();
  const handleShowToast = () => {
    dispatch(
      showToast({
        message: "Appointment successfully created!",
        variant: "success",
      })
    );
  };
  return (
    <Layout>
      <Button label="toggle" onClick={handleShowToast} />
      <EndosTable />
    </Layout>
  );
};
export default Home;
