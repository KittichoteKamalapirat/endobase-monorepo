import EditOfficer from "../components/EditOfficer";
import Layout from "../components/layouts/Layout";
import { CARD_CLASSNAMES } from "../theme";

const EditOfficerPage = () => {
  return (
    <Layout>
      <div className={CARD_CLASSNAMES}>
        <EditOfficer />
      </div>
    </Layout>
  );
};
export default EditOfficerPage;
