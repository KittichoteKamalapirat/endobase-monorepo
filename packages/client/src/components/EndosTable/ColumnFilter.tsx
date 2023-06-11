import { useEffect } from "react";
import { ENDO_STATUS_VALUES } from "../../utils/statusToColor";

interface Props {
  column: any;
  currentPageIndex: number;
  status: ENDO_STATUS_VALUES | "";
  globalFilter: string;
}

export const locations = ["A", "B", "C", "D", "E", "F", "G"];
export const ColumnFilter = ({
  column,
  currentPageIndex,
  status,
  globalFilter,
}: Props) => {
  const { filterValue, setFilter, id } = column || {};

  useEffect(() => {
    if (globalFilter) {
      id === "position" && setFilter("");
      id === "status" && setFilter("");
      return;
    }
    // // do not filter pageIndex if not
    // if (id === "Status" && status !== "ready" && status !== "") {
    //   setFilter(status);
    //   return;
    // }

    // filter pageIndex
    if (id === "position" && currentPageIndex !== -1) {
      setFilter(locations[currentPageIndex]);
    }

    if (id === "status") {
      // if (status !== "ready" && status !== "") return;
      // setFilter(locations[currentPageIndex]);
      setFilter(status);
      // return;
    }
  }, [currentPageIndex, id, status]);

  return (
    <input
      className="hidden"
      value={filterValue || ""}
      onChange={(e) => setFilter(e.target.value)}
    />
  );
};
