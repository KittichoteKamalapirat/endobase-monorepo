import { useEffect } from "react";
import { ENDO_STATUS_VALUES } from "../../utils/statusToColor";

interface Props {
  column: any
  currentPageIndex?: number
  status: ENDO_STATUS_VALUES | ""
  globalFilter: string
}

const locations = ["A", "B", "C", "D", "E", "F", "G"]
export const ColumnFilter = ({ column, currentPageIndex, status, globalFilter }: Props) => {
  const { filterValue, setFilter, Header } = column || {}

  useEffect(() => {
    if (globalFilter) {
      Header === "Location" && setFilter("")
      Header === "Status" && setFilter("")
    }
    else {
      typeof currentPageIndex === "number" && Header === "Location" && setFilter(locations[currentPageIndex])
      Header === "Status" && setFilter(status)
    }


  }, [currentPageIndex, Header, status])

  return (
    <input
      className="hidden"
      value={filterValue || ""}
      onChange={e => setFilter(e.target.value)} />
  );
};
