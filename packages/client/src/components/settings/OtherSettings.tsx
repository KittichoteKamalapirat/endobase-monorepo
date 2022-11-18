import { useSettingsQuery, Setting } from "../../generated/graphql";
import UpdateSetting from "./UpdateSetting";
import { Error } from "../skeletons/Error";
import { Loading } from "../skeletons/Loading";
import SubHeading from "../typography/SubHeading";

const OtherSettings = () => {
  const { data, loading, error } = useSettingsQuery();

  if (loading) return <Loading />;
  if (error) return <Error text="Error retrieving setting" />;
  return (
    <>
      <SubHeading heading="Other settings" />
      {data?.settings
        .slice()
        .sort((a, b) => (a.id < b.id ? -1 : -1))
        .map((setting) => {
          if (!setting) return null;
          return (
            <UpdateSetting key={setting.id} setting={setting as Setting} />
          );
        })}
    </>
  );
};
export default OtherSettings;
