// id, brand, model, type, storage time

export const myColumns = () => {
  return [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Brand",
      accessor: "rbrand",
    },
    {
      Header: "Model",
      accessor: "model",
    },
    {
      Header: "Type",
      accessor: "type",
    },
    {
      Header: "Storage Time",
      accessor: "storageTime",
    },
  ];
};
