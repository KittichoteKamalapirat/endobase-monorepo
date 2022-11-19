import { useMemo } from "react";
import { Column, useGlobalFilter, usePagination, useTable } from "react-table";
import { useEndosQuery } from "../../generated/graphql";
import { Error } from "../skeletons/Error";
import RowsSkeleton from "../skeletons/RowsSkeleton";
import PaginationControl from "../Table/PaginationControl";
import Table from "../Table/Table";
import TBody from "../Table/TBody";
import TD from "../Table/TD";
import TH from "../Table/TH";
import THead from "../Table/THead";
import TR from "../Table/TR";
import SubHeading from "../typography/SubHeading";
import { endoColumns } from "./endoColumns";
import { GlobalFilter } from "./GlobalFilter";

// 1. get the data
// 2. define the columns
// 3. create a table instance
// 4. define a table structure with HTML
// 5. use the table instance and put in HTML
// 6. style

const EndosSettingTable = () => {
  const { data: endosData, loading, error } = useEndosQuery();

  // the lib recommedns to use useMemo
  const columns = useMemo<Column[]>(() => endoColumns(), []);

  console.log("data", endosData);

  const data = useMemo(() => {
    if (error || loading || endosData?.endos.length === 0) return [];
    return endosData?.endos || [];
  }, [loading, endosData, error]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    setPageSize,

    state: { pageIndex, globalFilter, pageSize },
    prepareRow,

    setGlobalFilter, // for setting global filter text value
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    usePagination
  );

  if (loading) {
    return <RowsSkeleton />;
  }
  if (error) {
    return <Error text={error?.message} />;
  }

  return (
    <div>
      <SubHeading heading="Endoscopes Drying Time Setting" />
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
        pageIndex={pageIndex}
        pageSize={pageSize}
      />

      <Table {...getTableProps()}>
        <THead>
          {headerGroups.map((group, index) => (
            <TR {...group.getHeaderGroupProps} key={index}>
              {group.headers.map((col, index) => (
                <TH {...col.getHeaderProps()} key={index}>
                  {col.render("Header")}
                </TH>
              ))}
            </TR>
          ))}
        </THead>
        <TBody {...getTableBodyProps}>
          {page.map((row, index) => {
            prepareRow(row);

            return (
              <TR
                {...row.getRowProps()}
                key={index}
                className="border-b-2 border-solid border-grey-50"
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

export default EndosSettingTable;
