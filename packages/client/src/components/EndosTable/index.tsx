import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import classNames from "classnames";
import { useMemo, useState } from "react";
import { Column, useGlobalFilter, useTable, usePagination } from "react-table";
import {
  Endo,
  useEndosQuery,
  usePickEndoMutation,
} from "../../generated/graphql";

import { ENDO_STATUS_VALUES, statusToBgColor } from "../../utils/statusToColor";
import Button, { ButtonTypes } from "../Buttons/Button";
import CounterIndicator from "../CounterIndicator";
import { Error } from "../skeletons/Error";
import RowsSkeleton from "../skeletons/RowsSkeleton";
import Table from "../Table/Table";
import TBody from "../Table/TBody";
import TD from "../Table/TD";
import TH from "../Table/TH";
import THead from "../Table/THead";
import TR from "../Table/TR";
import PageHeading from "../typography/PageHeading";
import { endoColumns } from "./endoColumns";
import { GlobalFilter } from "./GlobalFilter";

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
    console.log("rerun colum 1");
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
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <Button
            label=""
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            type={ButtonTypes.TEXT}
            startIcon={<BsFillCaretLeftFill />}
          />

          <div id="page-indicator">
            <span className="font-bold">{pageIndex + 1} </span>/{" "}
            {pageOptions.length}
          </div>

          <Button
            label=""
            onClick={() => nextPage()}
            disabled={!canNextPage}
            type={ButtonTypes.TEXT}
            endIcon={<BsFillCaretRightFill />}
          />
        </div>

        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 50, 100, 200].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>

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
