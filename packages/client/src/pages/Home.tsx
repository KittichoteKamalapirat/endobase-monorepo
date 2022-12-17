import "react-tooltip/dist/react-tooltip.css";
import EndosTable from "../components/EndosTable";
import Layout from "../components/layouts/Layout";
import { useIsAuth } from "../hooks/useIsAuth";

const Home = () => {
  useIsAuth();
  return (
    <Layout>
      <EndosTable />
    </Layout>
  );
};
export default Home;
