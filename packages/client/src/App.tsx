import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import ContainerSnapshotDetailsButton from "./components/ContainerSnapshotDetailsButton";
import CreateRequestRepairPage from "./components/CreateRequestRepair.page";
import ConfirmModal from "./components/modals/ConfirmModal";
import Modal from "./components/modals/Modal";
import SubscribeToOverHumOrTemp from "./hooks/SubscribeToOverHumOrTemp";
import { urlResolver } from "./lib/UrlResolver";
import AboutPage from "./pages/About.page";
import Actions from "./pages/Actions";
import Admin from "./pages/Admin";
import AdminDbPage from "./pages/AdminDb.page";
import ConfigSetting from "./pages/ConfigSetting";
import Containers from "./pages/Containers";
import CreateEndo from "./pages/CreateEndo";
import CreateOfficerPage from "./pages/CreateOfficer.page";
import EditEndo from "./pages/EditEndo";
import EditOfficerPage from "./pages/EditOfficer.page";
import EndoPage from "./pages/Endo";
import Home from "./pages/Home";
import LandingPage from "./pages/Landing.page";
import LoginPage from "./pages/Login";
import Session from "./pages/Session";
import { closeAlertModal } from "./redux/slices/alertModalReducer";
import { closeConfirm } from "./redux/slices/confirmModalReducer";
import { RootState } from "./redux/store";
import CreateWaitRequestRepairPage from "./components/CreateWaitRequestRepair.page";

function App() {
  const { data, isOpen } = useSelector((state: RootState) => state.alertModal);
  const { data: confirmData, isOpen: confirmIsOpen } = useSelector(
    (state: RootState) => state.confirmModal
  );

  const dispatch = useDispatch();

  // const { showBoundary } = useErrorBoundary();
  // useEffect(() => showBoundary(new Error("Error occured test ")), []);

  return (
    <div className="App">
      <header className="App-header">
        <SubscribeToOverHumOrTemp />
        <Routes>
          {/* admin routes */}
          <Route path="/nimda" element={<Admin />} />
          <Route path={urlResolver.adminDb()} element={<AdminDbPage />} />
          <Route
            path={urlResolver.createOfficer()}
            element={<CreateOfficerPage />}
          />

          <Route path="/nimda/officer/:id/edit" element={<EditOfficerPage />} />

          <Route path="/landing" element={<LandingPage />} />

          <Route path="/" element={<Home />} />
          <Route
            path={urlResolver.requestRepair(":id")}
            element={<CreateRequestRepairPage />}
          />
          <Route
            path={urlResolver.waitRequestRepair(":id")}
            element={<CreateWaitRequestRepairPage />}
          />
          <Route path="containers" element={<Containers />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path={urlResolver.about()} element={<AboutPage />} />
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
