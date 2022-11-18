import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Buttons/Button";
import EndosTable from "../components/EndosTable";
import Layout from "../components/layouts/Layout";
import Modal from "../components/modals/Modal";
import { useIsAuth } from "../hooks/useIsAuth";
import {
  closeAlertModal,
  toggleAlertModal,
} from "../redux/slices/alertModalReducer";
import { RootState } from "../redux/store";

const Home = () => {
  const { data, isOpen } = useSelector((state: RootState) => state.alertModal);
  console.log("alert data", data);
  console.log("isOpen", isOpen);
  useIsAuth();

  const dispatch = useDispatch();
  const handleToggleModal = () => {
    dispatch(
      toggleAlertModal({
        heading: "Heading",
        content: "Content",
        type: "danger",
        ariaLabel: "content label",
      })
    );
  };
  return (
    <Layout>
      <Button label="toggle" onClick={handleToggleModal} />
      <EndosTable />
      <Modal
        contentLabel={data.ariaLabel}
        isOpen={isOpen}
        heading={data.heading}
        onRequestClose={() => {
          dispatch(closeAlertModal());
        }}
      >
        {data.content}
      </Modal>
    </Layout>
  );
};
export default Home;
