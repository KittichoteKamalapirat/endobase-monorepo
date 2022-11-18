import dayjs from "dayjs";
import { useMemo } from "react";
import { Column, useTable } from "react-table";
import { useSnapshotsQuery } from "../../generated/graphql";
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
import { snapshotColumns } from "./snapshotColumns";

const SnapshotsTable = () => {
  const { data: snapshotsData, loading, error, refetch } = useSnapshotsQuery();

  // the lib recommedns to use useMemo
  const columns = useMemo<Column[]>(() => snapshotColumns(), []);

  const data = useMemo(() => {
    if (error || loading || snapshotsData?.snapshots.length === 0) return [];

    const snapshots = [...(snapshotsData?.snapshots || [])]; // TODO make this less confusing
    return (
      snapshots.sort((prev, curr) => {
        const dateSort =
          dayjs(curr.createdAt).valueOf() - dayjs(prev.createdAt).valueOf();
        // const colSort =
        //   prev.container.col.charCodeAt(0) - curr.container.col.charCodeAt(0);
        // return dateSort || colSort;
        return dateSort;
      }) || []
    );
  }, [loading, snapshotsData, error]);

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
      <PageHeading heading="Snapshots" />
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

export default SnapshotsTable;
