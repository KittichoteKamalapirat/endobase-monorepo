import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { Endo } from "../generated/graphql";
import { urlResolver } from "../lib/UrlResolver";
import { ENDO_STATUS, ENDO_STATUS_VALUES } from "../utils/statusToColor";
import Badge from "./Badge";
import { useDispatch } from "react-redux";
import { updateFilter } from "../redux/slices/filterReducer";

interface Props {
  endos: Endo[];
  // setFilter: React.Dispatch<React.SetStateAction<string>>;
  activeStatus: "" | ENDO_STATUS_VALUES;
}

const EndoStatusTable2 = ({
  endos,
  // setFilter,
  activeStatus,
}: Props) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const readyNum = endos.filter(
    (endo) =>
      endo.status === ENDO_STATUS.READY || endo.status === ENDO_STATUS.DRYING // Added dyring just in case even thought it wouldn't exist
  ).length;

  const takenOutNum = endos.filter(
    (endo) => endo.status === ENDO_STATUS.taken_out
  ).length;

  const beingUsedNum = endos.filter(
    (endo) => endo.status === ENDO_STATUS.BEING_USED
  ).length;

  const inWashingRoomNum = endos.filter(
    (endo) => endo.status === ENDO_STATUS.IN_WASHING_ROOM
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

  const beingFixedNum = endos.filter(
    (endo) => endo.status === ENDO_STATUS.OUT_OF_ORDER
  ).length;

  const fixedNum = endos.filter(
    (endo) =>
      endo.status === ENDO_STATUS.FIXED ||
      endo.status === ENDO_STATUS.FIXED_AND_OUT
  ).length;

  const handleFilter = (status: ENDO_STATUS_VALUES | "") => {
    // clean container filter (pagination)
    if (status !== "ready" && status !== "")
      dispatch(updateFilter({ pageIndex: -1 }));

    if (activeStatus === status) {
      dispatch(updateFilter({ status: "" }));
      // setFilter("");
      navigate(urlResolver.endos(""));
      return;
    }
    navigate(urlResolver.endos(status));
    // setFilter(status);
    dispatch(updateFilter({ status }));
  };

  // if (defaultFilter) return <SubHeading heading={`EndoScopes: ${statusToLabel[defaultFilter]}`} />

  return (
    <div className="flex gap-2 flex-wrap">
      <div
        className="flex justify-between gap-2 hover:cursor-pointer"
        onClick={() => handleFilter(ENDO_STATUS.READY)}
      >
        {/* <div className="col-span-1">Ready</div> */}
        <Badge
          size="md"
          content={`Ready: ${readyNum}`}
          color={
            activeStatus === ENDO_STATUS.READY
              ? "text-grey-0 border-green"
              : "text-green border-green"
          }
          isActive={activeStatus === ENDO_STATUS.READY}
          activeColor="bg-green"
        />
      </div>

      <div
        className="flex justify-between gap-2 hover:cursor-pointer"
        onClick={() => handleFilter(ENDO_STATUS.taken_out)}
      >
        {/* <div className="col-span-1">Being Used</div> */}
        <Badge
          size="md"
          content={`Taken Out: ${takenOutNum}`}
          color={
            activeStatus === ENDO_STATUS.taken_out
              ? "text-grey-0 border-grey-400"
              : "text-grey-400 border-grey-400"
          }
          isActive={activeStatus === ENDO_STATUS.taken_out}
          activeColor="bg-grey-400"
        />
      </div>

      <div
        className="flex justify-between gap-2 hover:cursor-pointer"
        onClick={() => handleFilter(ENDO_STATUS.BEING_USED)}
      >
        {/* <div className="col-span-1">Being Used</div> */}
        <Badge
          size="md"
          content={`Being Used: ${beingUsedNum}`}
          color={
            activeStatus === ENDO_STATUS.BEING_USED
              ? "text-grey-0 border-grey-400"
              : "text-grey-400 border-grey-400"
          }
          isActive={activeStatus === ENDO_STATUS.BEING_USED}
          activeColor="bg-grey-400"
        />
      </div>

      <div
        className="flex justify-between gap-2 hover:cursor-pointer"
        onClick={() => handleFilter(ENDO_STATUS.IN_WASHING_ROOM)}
      >
        {/* <div className="col-span-1">Being Used</div> */}
        <Badge
          size="md"
          content={`In Washing Room: ${inWashingRoomNum}`}
          color={
            activeStatus === ENDO_STATUS.IN_WASHING_ROOM
              ? "text-grey-0 border-grey-400"
              : "text-grey-400 border-grey-400"
          }
          isActive={activeStatus === ENDO_STATUS.IN_WASHING_ROOM}
          activeColor="bg-grey-400"
        />
      </div>

      <div
        className="flex justify-between gap-2 hover:cursor-pointer"
        onClick={() => handleFilter(ENDO_STATUS.LEAK_TEST_PASSED)}
      >
        {/* <div className="col-span-1">Being Washed</div> */}
        <Badge
          size="md"
          content={`Leak Tested: ${leakTestPassedNum}`}
          color={
            activeStatus === ENDO_STATUS.LEAK_TEST_PASSED
              ? "text-grey-0 border-grey-400"
              : "text-grey-400 border-grey-400"
          }
          isActive={activeStatus === ENDO_STATUS.LEAK_TEST_PASSED}
          activeColor="bg-grey-400"
        />
      </div>

      <div
        className="flex justify-between gap-2 hover:cursor-pointer"
        onClick={() => handleFilter(ENDO_STATUS.DISINFECTION_PASSED)}
      >
        {/* <div className="col-span-1">Being Washed</div> */}
        <Badge
          size="md"
          content={`Disinfected: ${disinfectionPassedNum}`}
          color={
            activeStatus === ENDO_STATUS.DISINFECTION_PASSED
              ? "text-grey-0 border-grey-400"
              : "text-grey-400 border-grey-400"
          }
          isActive={activeStatus === ENDO_STATUS.DISINFECTION_PASSED}
          activeColor="bg-grey-400"
        />
      </div>

      <div
        className="flex justify-between gap-2 hover:cursor-pointer"
        onClick={() => handleFilter(ENDO_STATUS.EXPIRE_SOON)}
      >
        {/* <div className="col-span-1">Expire Soon</div> */}
        <Badge
          size="md"
          content={`Expire Soon: ${expireSoonNum}`}
          color={
            activeStatus === ENDO_STATUS.EXPIRE_SOON
              ? "text-grey-900 border-yellow"
              : "text-grey-900 border-yellow"
          }
          isActive={activeStatus === ENDO_STATUS.EXPIRE_SOON}
          activeColor="bg-yellow"
        />
      </div>

      <div
        className="flex justify-between gap-2 hover:cursor-pointer"
        onClick={() => handleFilter(ENDO_STATUS.EXPIRED)}
      >
        {/* <div className="col-span-1">Expired</div> */}
        <Badge
          size="md"
          content={`Expired: ${expiredNum}`}
          color={
            activeStatus === ENDO_STATUS.EXPIRED
              ? "text-grey-0 border-red"
              : "text-red border-red"
          }
          isActive={activeStatus === ENDO_STATUS.EXPIRED}
          activeColor="bg-red"
        />
      </div>

      <div
        className="flex justify-between gap-2 hover:cursor-pointer"
        onClick={() => handleFilter(ENDO_STATUS.OUT_OF_ORDER)}
      >
        <Badge
          size="md"
          content={`Out of Order: ${beingFixedNum}`}
          color={
            activeStatus === ENDO_STATUS.OUT_OF_ORDER
              ? "text-grey-0 border-grey-900"
              : "text-grey-900 border-grey-900"
          }
          isActive={activeStatus === ENDO_STATUS.OUT_OF_ORDER}
          activeColor="bg-grey-900"
        />
      </div>

      <div
        className="flex justify-between gap-2 hover:cursor-pointer"
        onClick={() => handleFilter(ENDO_STATUS.FIXED)}
      >
        <Badge
          size="md"
          content={`Fixed: ${fixedNum}`}
          color={
            activeStatus === ENDO_STATUS.FIXED
              ? "text-grey-900 border-[#ffc2d1]"
              : "text-grey-900 border-[#ffc2d1]"
          }
          isActive={activeStatus === ENDO_STATUS.FIXED}
          activeColor="bg-[#ffc2d1]"
        />
      </div>

      <div
        className="flex justify-between gap-2 hover:cursor-pointer"
        onClick={() => handleFilter("")}
      >
        {/* <div className="col-span-1">Total</div> */}
        <Badge
          size="md"
          content={`Total: ${endos.length}`}
          color={
            activeStatus === ""
              ? "text-grey-0 border-primary"
              : "text-primary border-primary"
          }
          isActive={activeStatus === ""}
          activeColor="bg-primary"
        />
      </div>
    </div>
  );
};
export default EndoStatusTable2;
