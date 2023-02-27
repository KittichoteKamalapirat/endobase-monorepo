import { useState } from "react";
import { Endo } from "../generated/graphql";
import { ENDO_STATUS, ENDO_STATUS_VALUES } from "../utils/statusToColor";
import Badge from "./Badge";

interface Props {
  endos: Endo[];
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const EndoStatusTable = ({ endos, setFilter }: Props) => {
  const [activeFilter, setActiveFilter] = useState<string>("");

  const readyNum = endos.filter(
    (endo) =>
      endo.status === ENDO_STATUS.READY || endo.status === ENDO_STATUS.DRYING // Added dyring just in case even thought it wouldn't exist
  ).length;
  const beingUsedNum = endos.filter(
    (endo) => endo.status === ENDO_STATUS.BEING_USED
  ).length;

  const leakTestPassedNum = endos.filter(
    (endo) =>
      endo.status === ENDO_STATUS.LEAK_TEST_PASSED ||
      endo.status === ENDO_STATUS.LEAK_TEST_FAILED
  ).length;

  const disinfectionPassedNum = endos.filter(
    (endo) =>
      endo.status === ENDO_STATUS.DISINFECTION_PASSED ||
      endo.status === ENDO_STATUS.DISINFECTION_FAILED
  ).length;

  const expireSoonNum = endos.filter(
    (endo) => endo.status === ENDO_STATUS.EXPIRE_SOON
  ).length;
  const expiredNum = endos.filter(
    (endo) =>
      endo.status === ENDO_STATUS.EXPIRED ||
      endo.status === ENDO_STATUS.EXPIRED_AND_OUT
  ).length;

  const handleFilter = (status: ENDO_STATUS_VALUES) => {
    if (activeFilter === status) return setActiveFilter("");
    setFilter(status);
    setActiveFilter(status);
  };

  return (
    <div className="border rounded-md px-4 py-2">
      <p className="font-bold mb-2">Status Summary</p>
      <div
        className="flex justify-between my-1 gap-2 hover:cursor-pointer"
        onClick={() => handleFilter(ENDO_STATUS.READY)}
      >
        {/* <div className="col-span-1">Ready</div> */}
        <Badge
          size="md"
          content="Ready"
          color={
            activeFilter === ENDO_STATUS.READY
              ? "text-grey-0 border-primary-primary"
              : "text-grey-400 border-grey-400"
          }
          isActive={activeFilter === ENDO_STATUS.READY}
          activeColor="bg-primary-primary"
        />
        <div className="col-span-1">{readyNum}</div>
      </div>

      <div
        className="flex justify-between my-1 gap-2 hover:cursor-pointer"
        onClick={() => handleFilter(ENDO_STATUS.BEING_USED)}
      >
        {/* <div className="col-span-1">Being Used</div> */}
        <Badge
          size="md"
          content="Being Used"
          color={
            activeFilter === ENDO_STATUS.BEING_USED
              ? "text-grey-0 border-grey-400"
              : "text-grey-400 border-grey-400"
          }
          isActive={activeFilter === ENDO_STATUS.BEING_USED}
          activeColor="bg-grey-400"
        />
        <div className="col-span-1">{beingUsedNum}</div>
      </div>

      <div
        className="flex justify-between my-1 gap-2 hover:cursor-pointer"
        onClick={() => handleFilter(ENDO_STATUS.LEAK_TEST_PASSED)}
      >
        {/* <div className="col-span-1">Being Washed</div> */}
        <Badge
          size="md"
          content="Leak Tested"
          color={
            activeFilter === ENDO_STATUS.LEAK_TEST_PASSED
              ? "text-grey-0 border-grey-400"
              : "text-grey-400 border-grey-400"
          }
          isActive={activeFilter === ENDO_STATUS.LEAK_TEST_PASSED}
          activeColor="bg-grey-400"
        />
        <div className="col-span-1">{leakTestPassedNum}</div>
      </div>

      <div
        className="flex justify-between my-1 gap-2 hover:cursor-pointer"
        onClick={() => handleFilter(ENDO_STATUS.DISINFECTION_PASSED)}
      >
        {/* <div className="col-span-1">Being Washed</div> */}
        <Badge
          size="md"
          content="Disinfected"
          color={
            activeFilter === ENDO_STATUS.DISINFECTION_PASSED
              ? "text-grey-0 border-grey-400"
              : "text-grey-400 border-grey-400"
          }
          isActive={activeFilter === ENDO_STATUS.DISINFECTION_PASSED}
          activeColor="bg-grey-400"
        />
        <div className="col-span-1">{disinfectionPassedNum}</div>
      </div>

      <div
        className="flex justify-between my-1 gap-2 hover:cursor-pointer"
        onClick={() => handleFilter(ENDO_STATUS.EXPIRE_SOON)}
      >
        {/* <div className="col-span-1">Expire Soon</div> */}
        <Badge
          size="md"
          content="Expire Soon"
          color={
            activeFilter === ENDO_STATUS.EXPIRE_SOON
              ? "text-grey-900 border-yellow"
              : "text-grey-900 border-yellow"
          }
          isActive={activeFilter === ENDO_STATUS.EXPIRE_SOON}
          activeColor="bg-yellow"
        />
        <div className="col-span-1">{expireSoonNum}</div>
      </div>

      <div
        className="flex justify-between my-1 gap-2 hover:cursor-pointer"
        onClick={() => handleFilter(ENDO_STATUS.EXPIRED)}
      >
        {/* <div className="col-span-1">Expired</div> */}
        <Badge
          size="md"
          content="Expired"
          color={
            activeFilter === ENDO_STATUS.EXPIRED
              ? "text-grey-0 border-red"
              : "text-red border-red"
          }
          isActive={activeFilter === ENDO_STATUS.EXPIRED}
          activeColor="bg-red"
        />
        <div className="col-span-1">{expiredNum}</div>
      </div>

      <div
        className="flex justify-between my-1 gap-2 hover:cursor-pointer"
        onClick={() => setFilter("")}
      >
        {/* <div className="col-span-1">Total</div> */}
        <Badge
          size="md"
          content="Total"
          color={
            activeFilter === ""
              ? "text-grey-0 border-grey-900"
              : "text-grey-900 border-grey-900"
          }
          isActive={activeFilter === ""}
          activeColor="bg-grey-900"
        />
        <div className="col-span-1">{endos.length}</div>
      </div>
    </div>
  );
};
export default EndoStatusTable;
