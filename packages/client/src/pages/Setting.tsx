import EndosSettingTable from "../components/EndosSettingTable";
import Layout from "../components/layouts/Layout";
import PageHeading from "../components/typography/PageHeading";

interface Props {}

const Setting = ({}: Props) => {
  return (
    <Layout>
      <PageHeading heading="Setting" />
      <div className="grid grid-cols-2">
        <div className="col-span-2">
          <EndosSettingTable />
        </div>
      </div>
    </Layout>
  );
};
export default Setting;
