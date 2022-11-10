import Layout from "../components/layouts/Layout";
import SnapshotsTable from "../components/SnapshotsTable";

interface Props {}

const Snapshots = ({}: Props) => {
  return (
    <Layout>
      <SnapshotsTable />
    </Layout>
  );
};
export default Snapshots;
