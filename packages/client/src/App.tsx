import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Modal from "./components/modals/Modal";
import Actions from "./pages/Actions";
import Containers from "./pages/Containers";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import Session from "./pages/Session";
import Setting from "./pages/Setting";
import Snapshots from "./pages/Snapshots";
import { closeAlertModal } from "./redux/slices/alertModalReducer";
import { RootState } from "./redux/store";

function App() {
  const { data, isOpen } = useSelector((state: RootState) => state.alertModal);

  const dispatch = useDispatch();

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="containers" element={<Containers />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="snapshots" element={<Snapshots />} />
          <Route path="setting" element={<Setting />} />
          <Route path="activities" element={<Actions />} />
          <Route path="/session/:id" element={<Session />} />
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
        {data.content}
      </Modal>
    </div>
  );
}

export default App;
