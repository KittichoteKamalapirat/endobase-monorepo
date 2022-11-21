import ContainerActionColumn from "./containerActionColumn";

export const containerColumns = () => {
  return [
    {
      Header: "Container",
      accessor: "col",
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
