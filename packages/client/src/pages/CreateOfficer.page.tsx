import CreateOfficer from "../components/CreateOfficer";
import Layout from "../components/layouts/Layout";
import { CARD_CLASSNAMES } from "../theme";

const CreateOfficerPage = () => {
  return (
    <Layout>
      <div className={CARD_CLASSNAMES}>
        <CreateOfficer />
      </div>
    </Layout>
  );
};
export default CreateOfficerPage;
