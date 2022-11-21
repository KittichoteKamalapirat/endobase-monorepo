import ActionsTable from "../components/ActionsTable";
import Layout from "../components/layouts/Layout";
import { useIsAuth } from "../hooks/useIsAuth";

const Actions = () => {
  useIsAuth();
  return (
    <Layout>
      <ActionsTable />
    </Layout>
  );
};
export default Actions;
