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
      Header: "Connection",
      accessor: "isConnected",
      Cell: ({ value: isConnected }: { value: boolean }) => (
        <div>
          {isConnected ? (
            <span className="text-green-500 font-bold animate-pulse-fast ">
              Online
            </span>
          ) : (
            <span className="text-grey-500">Offline</span>
          )}
        </div>
      ),
    },

    {
      Header: "Action",
      Cell: ({ row }: { row: any }) => <ContainerActionColumn row={row} />,
    },
  ];
};
