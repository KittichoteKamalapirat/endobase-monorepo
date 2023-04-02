import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";
import {
  Column,
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable
} from "react-table";
import {
  Endo,
  useEndosQuery,
  usePickEndoMutation,
  useSettingsQuery
} from "../../generated/graphql";

import { FaRegHospital } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CONTAINER_CAPACITY, CONTAINER_NUM, ICON_SIZE } from "../../constants";
import { useQueryParam } from "../../hooks/useQueryParam";
import { useRefetchCounter } from "../../hooks/useRefetchCounter";
import { useScreenIsLargerThan } from "../../hooks/useScreenIsLargerThan";
import { sortEndosByPosition } from "../../utils/sortEndosByPosition";
import { ENDO_STATUS_VALUES, statusToBgColor } from "../../utils/statusToColor";
import Button, { ButtonTypes } from "../Buttons/Button";
import CounterIndicator from "../CounterIndicator";
import EndoStatusTable2 from "../EndoStatusTable2";
import { Error } from "../skeletons/Error";
import RowsSkeleton from "../skeletons/RowsSkeleton";
import ManualPaginationControl from "../Table/ManualPaginationControl";
import SortHeader from "../Table/SortHeader";
import Table from "../Table/Table";
import TBody from "../Table/TBody";
import TD from "../Table/TD";
import TH from "../Table/TH";
import THead from "../Table/THead";
import TR from "../Table/TR";
import PageHeading from "../typography/PageHeading";
import { endoColumns } from "./endoColumns";
import { EndosGlobalFilter } from "./EndosGlobalFilter";
// 1. get the data
// 2. define the columns
// 3. create a table instance
// 4. define a table structure with HTML
// 5. use the table instance and put in HTML
// 6. style

const EndosTable = () => {
  const navigate = useNavigate();
  const { data: endosData, loading, error, refetch } = useEndosQuery();

  const initialStatus = useQueryParam("status") as ENDO_STATUS_VALUES || "";

  const [activeFilter, setActiveFilter] = useState<ENDO_STATUS_VALUES | "">(initialStatus);
  const [globalFilterValue, setGlobalFilterValue] = useState("")

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


  console.log('currentPageIndex', currentPageIndex)

  // the lib recommedns to use useMemo
  const columns = useMemo<Column[]>(() => {
    if (refetchCounter === 0) {
      return endoColumns({
        currentPageIndex,
        pickEndo,
        refetchEndos: refetch,
        isLargerThanBreakpoint,
        status: activeFilter,
        globalFilter: globalFilterValue
      }) as any
    }


    return endoColumns({
      pickEndo,
      refetchEndos: refetch,
      isLargerThanBreakpoint,
      currentPageIndex,
      status: activeFilter,
      globalFilter: globalFilterValue
    }) as any;
  }, [pickEndo, refetch, isLargerThanBreakpoint, currentPageIndex, activeFilter, globalFilterValue]);

  const data = useMemo(() => {
    if (error || loading || endosData?.endos.length === 0) return [];
    return sortedEndos || [];
  }, [loading, endosData, error, currentPageIndex]);

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
      initialState: { pageSize: 16 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  useEffect(() => {
    setGlobalFilterValue(globalFilter as string)
  }, [globalFilter, setGlobalFilterValue])


  // if change page number => filter to only that column
  useEffect(() => {
    if (currentPageIndex !== 0) gotoPage(currentPageIndex);
  }, [refetch, columns, pageIndex]);

  if (loading || settingsLoading) {
    return <RowsSkeleton />;
  }
  if (error || settingsError) {
    return <Error text={error?.message || settingsError?.message || ""} />;
  }



  // useEffect(() => {
  //   setFilter(defaultFilter)
  // }, [setFilter, defaultFilter])

  // useEffect(() => {
  //   pageIndex
  // }, [pageIndex])

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

        <div>
          <div className="my-4">
            <EndosGlobalFilter
              // globalFilterValue={globalFilterValue}
              // setGlobalFilterValue={setGlobalFilterValue}
              filter={globalFilter}
              setFilter={setGlobalFilter}
            // data={data}

            />
          </div>

          <div className="mb-2">
            {endosData?.endos && endosData?.endos.length > 0 && (
              <EndoStatusTable2
                endos={endosData?.endos as Endo[]}
                setFilter={setGlobalFilter}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}

              />
            )}
          </div>


        </div>
      </div>

      <div className="flex justify-between items-end">

        {/* only this component will get updated every seconds */}
        <CounterIndicator refetch={refetch} />

        {/* <PaginationControl
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
          className="mt-4"
        /> */}

        <ManualPaginationControl
          nextPage={() => {
            setCurrentPageIndex(currentPageIndex + 1);
          }}
          previousPage={() => {
            setCurrentPageIndex(currentPageIndex - 1);
          }}
          canNextPage={currentPageIndex + 1 < CONTAINER_NUM}
          canPreviousPage={currentPageIndex > 0}
          pageNum={CONTAINER_NUM}
          currPage={currentPageIndex + 1}
          pageSize={CONTAINER_CAPACITY}
          totalItemsCount={CONTAINER_NUM * CONTAINER_CAPACITY}
          className="mt-4"
        />




      </div>


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
                  {col.canFilter ? col?.render('Filter') : null}
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
