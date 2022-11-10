import dayjs from "dayjs";
import { pgDateToReadable } from "../../utils/pgDateToReadable";

export const snapshotColumns = () => {
  return [
    {
      Header: "Container",
      accessor: "container.col",
    },
    {
      Header: "Temperature",
      accessor: "temp",
    },
    {
      Header: "Humidity",
      accessor: "hum",
    },
    {
      Header: "system status",
      accessor: "systemStatus",
    },
    {
      Header: "Timestamp",
      accessor: "createdAt",
      Cell: ({ value }: { value: string }) => {
        return <div>{pgDateToReadable(value)}</div>;
      },
    },
  ];
};
