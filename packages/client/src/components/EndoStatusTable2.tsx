import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Endo } from "../generated/graphql";
import { urlResolver } from "../lib/UrlResolver";
import { updateFilter } from "../redux/slices/filterReducer";
import { ENDO_STATUS, ENDO_STATUS_VALUES } from "../utils/statusToColor";
import Badge from "./Badge";
import { filterEndoByStatus } from "../utils/filterEndoByStatus";

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
    (endo) => filterEndoByStatus(endo.status as ENDO_STATUS_VALUES, "ready") // Added dyring just in case even thought it wouldn't exist
  ).length;

  const selectedOutNum = endos.filter((endo) =>
    filterEndoByStatus(endo.status as ENDO_STATUS_VALUES, "selected")
  ).length;

  const beingUsedNum = endos.filter((endo) =>
    filterEndoByStatus(endo.status as ENDO_STATUS_VALUES, "being_used")
  ).length;

  const inWashingRoomNum = endos.filter((endo) =>
    filterEndoByStatus(endo.status as ENDO_STATUS_VALUES, "in_washing_room")
  ).length;

  const leakTestPassedNum = endos.filter((endo) =>
    filterEndoByStatus(endo.status as ENDO_STATUS_VALUES, "leak_test_passed")
  ).length;

  const disinfectionPassedNum = endos.filter((endo) =>
    filterEndoByStatus(endo.status as ENDO_STATUS_VALUES, "disinfection_passed")
  ).length;

  const expireSoonNum = endos.filter((endo) =>
    filterEndoByStatus(endo.status as ENDO_STATUS_VALUES, "expire_soon")
  ).length;
  const expiredNum = endos.filter((endo) =>
    filterEndoByStatus(endo.status as ENDO_STATUS_VALUES, "expired")
  ).length;

  const beingFixedNum = endos.filter((endo) =>
    filterEndoByStatus(endo.status as ENDO_STATUS_VALUES, "out_of_order")
  ).length;

  const fixedNum = endos.filter((endo) =>
    filterEndoByStatus(endo.status as ENDO_STATUS_VALUES, "fixed")
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
        onClick={() => handleFilter(ENDO_STATUS.SELECTED)}
      >
        {/* <div className="col-span-1">Being Used</div> */}
        <Badge
          size="md"
          content={`Selected: ${selectedOutNum}`}
          color={
            activeStatus === ENDO_STATUS.SELECTED
              ? "text-grey-0 border-grey-400"
              : "text-grey-400 border-grey-400"
          }
          isActive={activeStatus === ENDO_STATUS.SELECTED}
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
