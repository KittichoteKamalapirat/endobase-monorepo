import ContainersTable from "../components/ContainersTable";
import EndosTable from "../components/EndosTable";
import Layout from "../components/layouts/Layout";

const Home = () => {
  return (
    <Layout>
      <ContainersTable />
      <EndosTable />
    </Layout>
  );
};
export default Home;
