import { useMemo } from "react";
import { Column, useTable } from "react-table";

import dayjs from "dayjs";
import { useActionsQuery } from "../../generated/graphql";
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
import { actionColumns } from "./actionColumns";

const ActionsTable = () => {
  const { data: actionsData, loading, error, refetch } = useActionsQuery();

  console.log("actiondata", actionsData);
  // the lib recommedns to use useMemo
  const columns = useMemo<Column[]>(() => actionColumns(), []);

  const data = useMemo(() => {
    if (error || loading || actionsData?.actions.length === 0) return [];

    const actions = [...(actionsData?.actions || [])]; // TODO make this less confusing
    return (
      actions.sort((prev, curr) => {
        const dateSort =
          dayjs(curr.createdAt).valueOf() - dayjs(prev.createdAt).valueOf();
        return dateSort || 0;
      }) || []
    );
  }, [loading, actionsData, error]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  if (loading) {
    return <RowsSkeleton />;
  }
  if (error) {
    return <Error text={error?.message} />;
  }

  return (
    <div>
      <PageHeading heading="Activities" />
      <CounterIndicator refetch={refetch} />

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
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <TR {...row.getRowProps()} key={index}>
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

export default ActionsTable;
