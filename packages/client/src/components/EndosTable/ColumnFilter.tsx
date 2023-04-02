import { useEffect } from "react";
import { useQueryParam } from "../../hooks/useQueryParam";
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
  const container = useQueryParam("container")

  console.log('container', container)

  console.log('status', status)

  console.log('global filter', globalFilter)

  useEffect(() => {
    // if global filter => remove setFilter
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
      // className="hidden"
      value={filterValue || ""}
      onChange={e => setFilter(e.target.value)} />
  );
};
