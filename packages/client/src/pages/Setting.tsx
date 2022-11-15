import EndosSettingTable from "../components/EndosSettingTable";
import Layout from "../components/layouts/Layout";
import OtherSettings from "../components/OtherSettings";
import PageHeading from "../components/typography/PageHeading";

interface Props {}

const Setting = ({}: Props) => {
  return (
    <Layout>
      <PageHeading heading="Setting" />
      <div className="grid grid-cols-2">
        <div className="col-span-2">
          <div className="my-10">
            <EndosSettingTable />
          </div>
          <div className="my-10">
            <OtherSettings />
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Setting;
