import Layout from "../components/layouts/Layout";
import Migration from "../components/Migration";
import SubHeading from "../components/typography/SubHeading";

const AdminDbPage = () => {
  return (
    <Layout>
      <div className="mt-10">
        <SubHeading heading="Dangerous Zone" fontColor="text-red" />
        <Migration />
      </div>
    </Layout>
  );
};
export default AdminDbPage;
