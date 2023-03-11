import { useLocation } from "react-router-dom";
import { ButtonTypes } from "../components/Buttons/Button";
import LinkButton from "../components/Buttons/LinkButton";
import Layout from "../components/layouts/Layout";
import OfficersList from "../components/OfficersList";

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
    </Layout>
  );
};
export default Admin;
