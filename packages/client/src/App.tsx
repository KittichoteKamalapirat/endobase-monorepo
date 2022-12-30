import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import ContainerSnapshotDetailsButton from "./components/ContainerSnapshotDetailsButton";
import ConfirmModal from "./components/modals/ConfirmModal";
import Modal from "./components/modals/Modal";
import { config } from "./constants";
import SubscribeToOverHumOrTemp from "./hooks/SubscribeToOverHumOrTemp";

import Actions from "./pages/Actions";
import ConfigSetting from "./pages/ConfigSetting";
import Containers from "./pages/Containers";
import CreateEndo from "./pages/CreateEndo";
import EditEndo from "./pages/EditEndo";
import EndoPage from "./pages/Endo";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import Session from "./pages/Session";
import { closeAlertModal } from "./redux/slices/alertModalReducer";
import { closeConfirm } from "./redux/slices/confirmModalReducer";
import { RootState } from "./redux/store";

function App() {
  const { data, isOpen } = useSelector((state: RootState) => state.alertModal);
  const { data: confirmData, isOpen: confirmIsOpen } = useSelector(
    (state: RootState) => state.confirmModal
  );

  console.log('configgg', config)

  console.log('envvvv', process.env.SSL_CRT_FILE)
  console.log('envvvv', process.env.SSL_KEY_FILE)


  const dispatch = useDispatch();

  return (
    <div className="App">
      <header className="App-header">
        <SubscribeToOverHumOrTemp />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="containers" element={<Containers />} />
          <Route path="login" element={<LoginPage />} />
          {/* <Route path="snapshots" element={<Snapshots />} /> */}
          <Route path="setting" element={<ConfigSetting />} />
          <Route path="activities" element={<Actions />} />
          <Route path="/session/:id" element={<Session />} />
          <Route path="/endo/new" element={<CreateEndo />} />
          <Route path="/endo/:id" element={<EndoPage />} />
          <Route path="/endo/edit/:id" element={<EditEndo />} />
        </Routes>
      </header>

      <Modal
        contentLabel={data.ariaLabel}
        isOpen={isOpen}
        heading={data.heading}
        onRequestClose={() => {
          dispatch(closeAlertModal());
        }}
      >
        <div>
          <p>{data.content} </p>
          {data.actionsType === "containerSnapshot" ? (
            <ContainerSnapshotDetailsButton />
          ) : null}
        </div>
      </Modal>

      <ConfirmModal
        contentLabel={confirmData.ariaLabel}
        isOpen={confirmIsOpen}
        heading={confirmData.heading}
        onRequestClose={() => {
          dispatch(closeConfirm());
        }}
        toPerform={confirmData.toPerform}
        type={confirmData.type}
      >
        {confirmData.content}
      </ConfirmModal>

      <Toaster />
    </div>
  );
}

export default App;
