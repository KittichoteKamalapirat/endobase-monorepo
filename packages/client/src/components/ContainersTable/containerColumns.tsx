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
  ];
};
