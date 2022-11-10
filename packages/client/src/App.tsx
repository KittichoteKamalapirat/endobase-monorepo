import { Route, Routes } from "react-router-dom";
import Actions from "./pages/Actions";
import Containers from "./pages/Containers";
import Home from "./pages/Home";
import Session from "./pages/Session";
import Snapshots from "./pages/Snapshots";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="containers" element={<Containers />} />
          <Route path="snapshots" element={<Snapshots />} />
          <Route path="activities" element={<Actions />} />
          <Route path="/session/:id" element={<Session />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
