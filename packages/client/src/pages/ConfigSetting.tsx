import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Button, { ButtonTypes } from "../components/Buttons/Button";
import Layout from "../components/layouts/Layout";
import OtherSettings from "../components/settings/OtherSettings";
import PageHeading from "../components/typography/PageHeading";
import { ICON_SIZE } from "../constants";
import { useIsAuth } from "../hooks/useIsAuth";
import { urlResolver } from "../lib/UrlResolver";

const ConfigSetting = () => {
  const navigate = useNavigate();
  useIsAuth();

  return (
    <Layout>
      <PageHeading heading="Setting" />
      <div className="grid grid-cols-2">
        <div className="col-span-2">
          {/* <div className="my-10">
            <EndosSettingTable />
          </div> */}
          <div className="my-10">
            <OtherSettings />
          </div>
        </div>
      </div>

      <Button
        label="Admin"
        startIcon={<MdOutlineAdminPanelSettings size={ICON_SIZE + 10} />}
        type={ButtonTypes.OUTLINED}
        onClick={() =>
          navigate(urlResolver.admin(), {
            state: { prev: urlResolver.setting() },
          })
        }
      />
    </Layout>
  );
};
export default ConfigSetting;
