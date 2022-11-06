import { useMemo } from "react";
import { Column, useTable } from "react-table";
import { useEndosQuery, usePickEndoMutation } from "../../generated/graphql";
import Layout from "../layouts/Layout";
import { Error } from "../skeletons/Error";
import RowsSkeleton from "../skeletons/RowsSkeleton";
import Table from "../Table/Table";
import TBody from "../Table/TBody";
import TD from "../Table/TD";
import TH from "../Table/TH";
import THead from "../Table/THead";
import TR from "../Table/TR";
import { myColumns } from "./myColumns";

// 1. get the data
// 2. define the columns
// 3. create a table instance
// 4. define a table structure with HTML
// 5. use the table instance and put in HTML
// 6. style

const EndosTable = () => {
  const { data: endosData, loading, error } = useEndosQuery();
  const [useEndo] = usePickEndoMutation();

  // the lib recommedns to use useMemo
  const columns = useMemo<Column[]>(() => myColumns(useEndo), []);

  console.log("data", endosData);

  const data = useMemo(() => {
    if (error || loading || endosData?.endos.length === 0) return [];
    return endosData?.endos || [];
  }, [loading, endosData, error]);

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
    <Layout>
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
    </Layout>
  );
};

export default EndosTable;
