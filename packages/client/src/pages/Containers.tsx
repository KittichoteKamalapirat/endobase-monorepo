import { useState } from "react";
import { useLocation } from "react-router-dom";
import ContainersTable from "../components/ContainersTable";
import Layout from "../components/layouts/Layout";
import SnapshotsTable from "../components/SnapshotsTable";
import Tabs from "../components/Tabs";
import {
  CONTAINER_TAB_VALUES,
  serviceTypeOptions,
} from "../components/Tabs/CONTAINER_TAB_TYPE";
import Tab from "../components/Tabs/Tab";
import PageHeading from "../components/typography/PageHeading";

const Containers = () => {
  const { state } = useLocation();

  const { tab } = state || {};

  console.log("tab", tab);
  const [selectTab, setSelectedTab] = useState<CONTAINER_TAB_VALUES>(
    tab || "current"
  );

  return (
    <Layout>
      <div className="flex justify-between">
        <PageHeading heading="Containers" />
        <Tabs>
          {serviceTypeOptions.map((option) => (
            <Tab
              key={option.value}
              isActive={selectTab === option.value}
              onClick={() => {
                // navigate(`/container`, {
                //   state: { tab: option.value },
                // });

                setSelectedTab(option.value);
              }}
            >
              {option.label}
            </Tab>
          ))}
        </Tabs>
      </div>

      <div className="mt-10">
        {selectTab === "current" ? <ContainersTable /> : null}
        {selectTab === "snapshots" ? <SnapshotsTable /> : null}
      </div>
    </Layout>
  );
};
export default Containers;
