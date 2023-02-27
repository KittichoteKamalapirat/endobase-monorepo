import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";
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
  useSettingsQuery,
} from "../../generated/graphql";

import { useNavigate } from "react-router-dom";
import { useRefetchCounter } from "../../hooks/useRefetchCounter";
import { useScreenIsLargerThan } from "../../hooks/useScreenIsLargerThan";
import { sortEndosByPosition } from "../../utils/sortEndosByPosition";
import { ENDO_STATUS_VALUES, statusToBgColor } from "../../utils/statusToColor";
import Button, { ButtonTypes } from "../Buttons/Button";
import CounterIndicator from "../CounterIndicator";
import { Error } from "../skeletons/Error";
import RowsSkeleton from "../skeletons/RowsSkeleton";
import PaginationControl from "../Table/PaginationControl";
import SortHeader from "../Table/SortHeader";
import Table from "../Table/Table";
import TBody from "../Table/TBody";
import TD from "../Table/TD";
import TH from "../Table/TH";
import THead from "../Table/THead";
import TR from "../Table/TR";
import PageHeading from "../typography/PageHeading";
import { endoColumns } from "./endoColumns";
import { GlobalFilter } from "./GlobalFilter";
import { ICON_SIZE } from "../../constants";
import { FaRegHospital } from "react-icons/fa";
import EndoStatusTable from "../EndoStatusTable";
// 1. get the data
// 2. define the columns
// 3. create a table instance
// 4. define a table structure with HTML
// 5. use the table instance and put in HTML
// 6. style

const EndosTable = () => {
  const navigate = useNavigate();
  const { data: endosData, loading, error, refetch } = useEndosQuery();

  const {
    data: settingsData,
    loading: settingsLoading,
    error: settingsError,
  } = useSettingsQuery();

  const hospitalName = useMemo(
    () =>
      settingsData?.settings.find((setting) => setting.name === "hospitalName")
        ?.value,
    [settingsData]
  );

  const isLargerThanBreakpoint = useScreenIsLargerThan("md");
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const sortedEndos = sortEndosByPosition(endosData?.endos as Endo[]);

  // const refetchCounter = useRefetchCounter(refetch);
  const [pickEndo] = usePickEndoMutation();
  const refetchCounter = useRefetchCounter(refetch);

  // the lib recommedns to use useMemo
  const columns = useMemo<Column[]>(() => {
    if (refetchCounter === 0) {
      return endoColumns({
        pickEndo,
        refetchEndos: refetch,
        isLargerThanBreakpoint,
      });
    }

    return endoColumns({
      pickEndo,
      refetchEndos: refetch,
      isLargerThanBreakpoint,
    });
  }, [pickEndo, refetch, isLargerThanBreakpoint]);

  const data = useMemo(() => {
    if (error || loading || endosData?.endos.length === 0) return [];
    return sortedEndos || [];
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
    gotoPage,
    prepareRow,
    state: { pageIndex, globalFilter, pageSize }, // table state
    setGlobalFilter, // for setting global filter text value
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 50 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  useEffect(() => {
    if (currentPageIndex !== 0) gotoPage(currentPageIndex);
  }, [refetch, columns, pageIndex]);

  if (loading || settingsLoading) {
    return <RowsSkeleton />;
  }
  if (error || settingsError) {
    return <Error text={error?.message || settingsError?.message || ""} />;
  }

  return (
    <div>
      <div id="header">
        <div
          data-note="hospital-name-and-add-button"
          className="flex justify-between items-center mb-4"
        >
          <div className="flex items-center gap-4">
            <FaRegHospital size={ICON_SIZE + 10} />
            <PageHeading
              heading={hospitalName}
              fontSize="text-md md:text-2xl"
            />
          </div>

          <Button
            label="Add"
            onClick={() => {
              navigate("/endo/new", {
                state: { prev: `/setting` },
              });
            }}
            type={ButtonTypes.PRIMARY}
          />
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div id="left" className="col-span-12 md:col-span-9">
            <div className="my-4">
              <GlobalFilter
                filter={globalFilter}
                setFilter={setGlobalFilter}
                data={data}
              />
            </div>
            <PaginationControl
              nextPage={() => {
                nextPage();
                setCurrentPageIndex(pageIndex + 1);
              }}
              previousPage={() => {
                previousPage();
                setCurrentPageIndex(pageIndex - 1);
              }}
              canNextPage={canNextPage}
              canPreviousPage={canPreviousPage}
              pageNum={pageOptions.length}
              setPageSize={setPageSize}
              currPage={pageIndex + 1}
              pageSize={pageSize}
              totalItemsCount={endosData?.endos.length}
            />
          </div>
          <div id="right" className="col-span-12 md:col-span-3">
            {endosData?.endos && endosData?.endos.length > 0 && (
              <EndoStatusTable
                endos={endosData?.endos as Endo[]}
                setFilter={setGlobalFilter}
              />
            )}
          </div>
        </div>
      </div>

      {/* only this component will get updated every seconds */}
      <CounterIndicator refetch={refetch} />
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
                className={classNames(
                  rowColor,
                  "border-b-2 border-solid border-grey-50 hover:cursor-pointer"
                )}
              >
                {row.cells.map((cell: any, index) => (
                  <TD
                    {...cell.getCellProps()}
                    isnumeric={cell.column.isNumeric}
                    key={index}
                    onClick={
                      // if col is action => don't navigate! (nested links are not allowed)
                      cell.column.Header !== "Action"
                        ? () =>
                            navigate(`/endo/${(row.original as Endo).id}`, {
                              state: { prev: "/" },
                            })
                        : undefined
                    }
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
