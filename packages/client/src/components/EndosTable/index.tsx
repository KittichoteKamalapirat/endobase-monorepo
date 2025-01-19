import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";
import {
  Column,
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import {
  Endo,
  useContainersQuery,
  useEndosQuery,
  usePickEndoMutation,
  useSettingsQuery,
} from "../../generated/graphql";

import { FaRegHospital } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CONTAINER_CAPACITY, CONTAINER_NUM, ICON_SIZE } from "../../constants";
import { useRefetchCounter } from "../../hooks/useRefetchCounter";
import { useScreenIsLargerThan } from "../../hooks/useScreenIsLargerThan";
import { updateFilter } from "../../redux/slices/filterReducer";
import { RootState } from "../../redux/store";
import { filterEndoByStatus } from "../../utils/filterEndoByStatus";
import { sortEndosByPosition } from "../../utils/sortEndosByPosition";
import { ENDO_STATUS_VALUES, statusToBgColor } from "../../utils/statusToColor";
import Badge from "../Badge";
import Button, { ButtonTypes } from "../Buttons/Button";
import CounterIndicator from "../CounterIndicator";
import EndoStatusTable2 from "../EndoStatusTable2";
import ManualPaginationControl from "../Table/ManualPaginationControl";
import SortHeader from "../Table/SortHeader";
import TBody from "../Table/TBody";
import TD from "../Table/TD";
import TH from "../Table/TH";
import THead from "../Table/THead";
import TR from "../Table/TR";
import Table from "../Table/Table";
import { Error } from "../skeletons/Error";
import RowsSkeleton from "../skeletons/RowsSkeleton";
import PageHeading from "../typography/PageHeading";
import { locations } from "./ColumnFilter";
import { EndosGlobalFilter } from "./EndosGlobalFilter";
import { endoColumns } from "./endoColumns";
// 1. get the data
// 2. define the columns
// 3. create a table instance
// 4. define a table structure with HTML
// 5. use the table instance and put in HTML
// 6. style

const EndosTable = () => {
  const navigate = useNavigate();
  const { data: endosData, loading, error, refetch } = useEndosQuery();

  // const initialStatus = (useQueryParam("status") as ENDO_STATUS_VALUES) || "";

  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const {
    data: settingsData,
    loading: settingsLoading,
    error: settingsError,
  } = useSettingsQuery();

  const {
    data: containersData,
    loading: containerLoading,
    error: containerError,
  } = useContainersQuery();

  const hospitalName = useMemo(
    () =>
      settingsData?.settings.find((setting) => setting.name === "hospitalName")
        ?.value,
    [settingsData]
  );

  const isLargerThanBreakpoint = useScreenIsLargerThan("md");
  // const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const { pageIndex: currentPageIndex, status: activeStatus } = useSelector(
    (state: RootState) => state.filter
  );

  const dispatch = useDispatch();

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
        currentPageIndex,
        status: activeStatus,
        globalFilter: globalFilterValue,
      }) as any;
    }

    return endoColumns({
      pickEndo,
      refetchEndos: refetch,
      isLargerThanBreakpoint,
      currentPageIndex,
      status: activeStatus,
      globalFilter: globalFilterValue,
    }) as any;
  }, [
    pickEndo,
    refetch,
    isLargerThanBreakpoint,
    currentPageIndex,
    activeStatus,
    globalFilterValue,
  ]);

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
    rows,
    gotoPage,
    prepareRow,
    state: { pageIndex, globalFilter, pageSize }, // table state
    setGlobalFilter, // for setting global filter text value
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 100 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const isPagination = activeStatus === "ready" || activeStatus === "";
  const pageRows = isPagination ? page : rows;

  const handleSelectContainer = (pageIndex: number) => {
    console.log("pageIndex", pageIndex);
    console.log("currentPageIndex", currentPageIndex);
    if (pageIndex === currentPageIndex)
      return dispatch(updateFilter({ pageIndex: -1 }));
    dispatch(updateFilter({ pageIndex }));
  };

  useEffect(() => {
    setGlobalFilterValue(globalFilter as string);
  }, [globalFilter, setGlobalFilterValue]);

  // if change page number => filter to only that column
  useEffect(() => {
    if (currentPageIndex !== 0) gotoPage(currentPageIndex);
  }, [refetch, columns, pageIndex]);

  // if status !=  ""(total) or ready => do not filter container

  if (loading || settingsLoading || containerLoading) {
    return <RowsSkeleton />;
  }
  if (error || settingsError || containerError) {
    return (
      <Error
        text={
          error?.message ||
          settingsError?.message ||
          containerError?.message ||
          ""
        }
      />
    );
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
            <p className="font-bold text-lg">Status</p>
            {endosData?.endos && endosData?.endos.length > 0 && (
              <EndoStatusTable2
                endos={endosData?.endos as Endo[]}
                activeStatus={activeStatus}
              />
            )}
          </div>
        </div>
      </div>
      {/* container buttons */}
      <p className="font-bold text-lg">Containers</p>
      {/* TODO: when containers num changes  */}
      <div className={`grid grid-cols-7`}>
        {containersData?.containers
          .slice()
          .sort((a, b) => (a.col === b.col ? 0 : a.col < b.col ? -1 : 1))
          .map((container, index) => (
            <Badge
              key={`container-${index}`}
              onClick={() => handleSelectContainer(index)}
              size="lg"
              content={`${container.col.toUpperCase()}: ${
                endosData?.endos.filter(
                  (endo) =>
                    (locations[index].toLowerCase() ===
                      endo.tray.container.col &&
                      filterEndoByStatus(
                        endo.status as ENDO_STATUS_VALUES,
                        activeStatus
                      )) ||
                    (locations[index].toLowerCase() ===
                      endo.tray.container.col &&
                      activeStatus === "")
                ).length
              } `}
              color={
                currentPageIndex === -1 || index === currentPageIndex
                  ? "text-grey-0 border-primary"
                  : "text-grey-400 border-grey-400"
              }
              isActive={currentPageIndex === -1 || index === currentPageIndex}
              activeColor="bg-primary"
            />
          ))}
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

        {isPagination && (
          <ManualPaginationControl
            nextPage={() => {
              dispatch(updateFilter({ pageIndex: currentPageIndex + 1 }));
            }}
            previousPage={() => {
              dispatch(updateFilter({ pageIndex: currentPageIndex - 1 }));
            }}
            canNextPage={currentPageIndex + 1 < CONTAINER_NUM}
            canPreviousPage={currentPageIndex > 0}
            pageNum={CONTAINER_NUM}
            currPage={currentPageIndex + 1}
            pageSize={CONTAINER_CAPACITY}
            totalItemsCount={CONTAINER_NUM * CONTAINER_CAPACITY}
            className="mt-4"
          />
        )}
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
                    {col.canFilter ? col?.render("Filter") : null}
                  </div>
                  
                </TH>
              ))}
            </TR>
          ))}
        </THead>
        <TBody {...getTableBodyProps}>
          {pageRows.map((row, index) => {
            prepareRow(row);

            const rowStatus = (pageRows[index].original as Endo)
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
                      // if col is action or others => don't navigate! (nested links are not allowed)
                      cell.column.Header !== "Action" &&
                      cell.column.id !== "others"
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
