import { useMemo } from "react";
import { useTable, Column } from "react-table";
import { useEndosQuery } from "../../generated/graphql";
import { Error } from "../skeletons/Error";
import { Loading } from "../skeletons/Loading";
import { myColumns } from "./myColumns";

// 1. get the data
// 2. define the columns
// 3. create a table instance
// 4. define a table structure with HTML
// 5. use the table instance and put in HTML
// 6. style

const EndosTable = () => {
  const { data: endosData, loading, error } = useEndosQuery();

  // the lib recommedns to use useMemo
  const columns = useMemo<Column[]>(() => myColumns(), []);

  console.log("data", endosData);
  console.log("type", typeof columns);

  const data = useMemo(() => {
    console.log("data", endosData);
    // if (loading || endosData?.endos.length === 0) return [];
    return [
      {
        id: "6281dca0-e50f-4c32-9c4d-a15761aa0a7b",
        trayId: "eb8572ac-43ce-11ed-b878-0242ac120002",
        brand: "Olympus",
        type: "broncho",
        model: "modelx",
      },
      {
        id: "1cbb9ecf-440c-412c-a599-228ea95c7d4c",
        trayId: "c522be4e-43ce-11ed-b878-0242ac120002",
        brand: "Fuji",
        type: "Gastro",
        model: "string",
      },
    ];
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error text={error.message} />;
  }

  return (
    <table className="table-auto" {...getTableProps()}>
      <thead>
        {headerGroups.map((group) => (
          <tr {...group.getHeaderGroupProps}>
            {group.headers.map((col) => (
              <th {...col.getHeaderProps()}>{col.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps}>
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={index}>
              {row.cells.map((cell: any, index) => (
                <td
                  {...cell.getCellProps()}
                  isNumeric={cell.column.isNumeric}
                  key={index}
                >
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default EndosTable;
