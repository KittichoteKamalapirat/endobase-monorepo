import { useLocation } from "react-router-dom";
import { ButtonTypes } from "../components/Buttons/Button";
import LinkButton from "../components/Buttons/LinkButton";
import Layout from "../components/layouts/Layout";
import Migration from "../components/Migration";
import OfficersList from "../components/OfficersList";
import SubHeading from "../components/typography/SubHeading";

const Admin = () => {
  // for back button
  const { state } = useLocation();

  console.log("state", state);
  const { prev } = state || {}; // read the prev route
  return (
    <Layout>
      <div className="flex justify-start my-4">
        <LinkButton
          label="Back"
          href={prev ? `${prev}` : "/"}
          type={ButtonTypes.OUTLINED}
          extraClass="min-w-24"
        />
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
