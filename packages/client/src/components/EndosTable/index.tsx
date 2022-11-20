import classNames from "classnames";
import { useMemo } from "react";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import {
  Column,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import {
  Endo,
  useEndosQuery,
  usePickEndoMutation,
} from "../../generated/graphql";

import { ICON_SIZE } from "../../constants";
import { ENDO_STATUS_VALUES, statusToBgColor } from "../../utils/statusToColor";
import CounterIndicator from "../CounterIndicator";
import { Error } from "../skeletons/Error";
import RowsSkeleton from "../skeletons/RowsSkeleton";
import PaginationControl from "../Table/PaginationControl";
import Table from "../Table/Table";
import TBody from "../Table/TBody";
import TD from "../Table/TD";
import TH from "../Table/TH";
import THead from "../Table/THead";
import TR from "../Table/TR";
import PageHeading from "../typography/PageHeading";
import { endoColumns } from "./endoColumns";
import { GlobalFilter } from "./GlobalFilter";
import SortHeader from "../Table/SortHeader";

// 1. get the data
// 2. define the columns
// 3. create a table instance
// 4. define a table structure with HTML
// 5. use the table instance and put in HTML
// 6. style

const EndosTable = () => {
  const { data: endosData, loading, error, refetch } = useEndosQuery();
  // const refetchCounter = useRefetchCounter(refetch);
  const [pickEndo] = usePickEndoMutation();

  // the lib recommedns to use useMemo
  const columns = useMemo<Column[]>(() => {
    return endoColumns({ pickEndo, refetchEndos: refetch });
  }, [pickEndo, refetch]);

  const data = useMemo(() => {
    if (error || loading || endosData?.endos.length === 0) return [];
    return endosData?.endos || [];
  }, [loading, endosData, error]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // pagination starts
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions, // for getting all pages num
    setPageSize, // for customize pageSize
    // pagination ends

    prepareRow,
    state: { pageIndex, globalFilter, pageSize }, // table state
    setGlobalFilter, // for setting global filter text value
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  console.log("re render");

  if (loading) {
    return <RowsSkeleton />;
  }
  if (error) {
    return <Error text={error?.message} />;
  }

  return (
    <div>
      <PageHeading heading="Endoscopes" />
      {/* only this component will get updated every seconds */}
      <CounterIndicator refetch={refetch} />
      <div className="my-4">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <PaginationControl
        nextPage={nextPage}
        previousPage={previousPage}
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
        pageNum={pageOptions.length}
        setPageSize={setPageSize}
        currPage={pageIndex + 1}
        pageSize={pageSize}
      />

      <Table {...getTableProps()}>
        <THead>
          {headerGroups.map((group, index) => (
            <TR {...group.getHeaderGroupProps} key={index}>
              {group.headers.map((col, index) => (
                <TH
                  {...col.getHeaderProps(col.getSortByToggleProps())}
                  key={index}
                >
                  <div className="flex gap-2 items-center">
                    {col.render("Header")}
                    <SortHeader
                      isSorted={col.isSorted}
                      isSortedDesc={col.isSortedDesc}
                    />
                  </div>
                </TH>
              ))}
            </TR>
          ))}
        </THead>
        <TBody {...getTableBodyProps}>
          {page.map((row, index) => {
            prepareRow(row);

            const rowStatus = (page[index].original as Endo)
              .status as ENDO_STATUS_VALUES;
            const rowColor = statusToBgColor[rowStatus];

            return (
              <TR
                {...row.getRowProps()}
                key={index}
                className={classNames(rowColor)}
              >
                {row.cells.map((cell: any, index) => (
                  <TD
                    {...cell.getCellProps()}
                    isnumeric={cell.column.isNumeric}
                    key={index}
                  >
                    {cell.render("Cell")}
                  </TD>
                ))}
              </TR>
            );
          })}
        </TBody>
      </Table>
    </div>
  );
};

export default EndosTable;
