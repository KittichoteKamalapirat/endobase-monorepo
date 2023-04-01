import { useEffect } from "react";
import { ENDO_STATUS_VALUES } from "../../utils/statusToColor";

interface Props {
  column: any
  currentPageIndex?: number
  status: ENDO_STATUS_VALUES | ""
}

const locations = ["A", "B", "C", "D", "E", "F", "G"]
export const ColumnFilter = ({ column, currentPageIndex, status }: Props) => {
  const { filterValue, setFilter, Header } = column || {}

  console.log('status', status)


  useEffect(() => {
    typeof currentPageIndex === "number" && Header === "Location" && setFilter(locations[currentPageIndex])

    Header === "Status" && setFilter(status)

  }, [currentPageIndex, Header, status])

  return (
    <input
      className="hidden"
      value={filterValue || ""}
      onChange={e => setFilter(e.target.value)} />
  );
};
