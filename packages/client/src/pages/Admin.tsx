import Layout from "../components/layouts/Layout";
import Migration from "../components/Migration";
import OfficersList from "../components/OfficersList";
import SubHeading from "../components/typography/SubHeading";

const Admin = () => {
  return (
    <Layout>
      <OfficersList />

      <div className="mt-10">
        <SubHeading heading="Dangerous Zone" fontColor="text-red" />
        <Migration />
      </div>
    </Layout>
  );
};
export default Admin;
