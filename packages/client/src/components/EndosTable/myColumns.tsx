// id, brand, model, type, storage time

import Button from "../Buttons/Button";

export const myColumns = () => {
  return [
    {
      Header: "No.",
      accessor: "id",
    },
    {
      Header: "Brand",
      accessor: "brand",
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
    {
      Header: "Action",
      // accessor: "",
      Cell: () => {
        return <Button label="use" />;
      },
    },
  ];
};
