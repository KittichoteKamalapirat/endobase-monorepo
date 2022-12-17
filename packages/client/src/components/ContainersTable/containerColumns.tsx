import ContainerActionColumn from "./containerActionColumn";

export const containerColumns = () => {
  return [
    {
      Header: "Container",
      accessor: "col",
      Cell: ({ value: col }: { value: string }) => (
        <div>{col.toUpperCase()}</div>
      ),
    },
    {
      Header: "Temperature",
      accessor: "currTemp",
    },
    {
      Header: "Humidity",
      accessor: "currHum",
    },
    {
      Header: "Action",
      Cell: ({ row }: { row: any }) => <ContainerActionColumn row={row} />,
    },
  ];
};
