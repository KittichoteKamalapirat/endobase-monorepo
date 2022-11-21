import Layout from "../components/layouts/Layout";
import SnapshotsTable from "../components/SnapshotsTable";
import { useIsAuth } from "../hooks/useIsAuth";

const Snapshots = () => {
  useIsAuth();
  return (
    <Layout>
      <SnapshotsTable />
    </Layout>
  );
};
export default Snapshots;
