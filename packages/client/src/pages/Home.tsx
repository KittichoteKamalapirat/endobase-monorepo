import { useSelector } from "react-redux";
import EndosTable from "../components/EndosTable";
import Layout from "../components/layouts/Layout";
import { useIsAuth } from "../hooks/useIsAuth";
import { RootState } from "../redux/store";

const Home = () => {
  const { data, isOpen } = useSelector((state: RootState) => state.alertModal);
  console.log("alert data", data);
  console.log("isOpen", isOpen);
  useIsAuth();

  return (
    <Layout>
      <EndosTable />
    </Layout>
  );
};
export default Home;
