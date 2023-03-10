import CreateOfficer from "../components/CreateOfficer";
import Layout from "../components/layouts/Layout";
import Migration from "../components/Migration";
import OfficersList from "../components/OfficersList";
import SubHeading from "../components/typography/SubHeading";
import { CARD_CLASSNAMES } from "../theme";

const Admin = () => {
  return (
    <Layout>
      <div className={CARD_CLASSNAMES}>
        <CreateOfficer />
      </div>

      <OfficersList />

      <div className="mt-10">
        <SubHeading heading="Dangerous Zone" fontColor="text-red" />
        <Migration />
      </div>
    </Layout>
  );
};
export default Admin;
