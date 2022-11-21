import { useState } from "react";
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
  const [selectedTab, setSelectedTab] =
    useState<CONTAINER_TAB_VALUES>("current");

  console.log("select tab", selectedTab);

  return (
    <Layout>
      <div className="flex justify-between">
        <PageHeading heading="Containers" />
        <Tabs>
          {serviceTypeOptions.map((option) => (
            <Tab
              key={option.value}
              isActive={selectedTab === option.value}
              onClick={() => setSelectedTab(option.value)}
            >
              {option.label}
            </Tab>
          ))}
        </Tabs>
      </div>

      <div className="mt-10">
        {selectedTab === "current" ? <ContainersTable /> : null}
        {selectedTab === "snapshots" ? <SnapshotsTable /> : null}
      </div>
    </Layout>
  );
};
export default Containers;
