import { useEffect } from "react";
import { ENDO_STATUS_VALUES } from "../../utils/statusToColor";

interface Props {
  column: any
  currentPageIndex?: number
  status: string
}

const locations = ["A", "B", "C", "D", "E", "F", "G"]
export const ColumnFilter = ({ column, currentPageIndex }: Props) => {
  const { filterValue, setFilter, Header } = column || {}



  useEffect(() => {
    typeof currentPageIndex === "number" && Header === "Location" && setFilter(locations[currentPageIndex])

  }, [currentPageIndex, Header])

  return (
    <input
      className="hidden"
      value={filterValue || ""}
      onChange={e => setFilter(e.target.value)} />
  );
};
