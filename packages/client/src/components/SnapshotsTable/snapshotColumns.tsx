import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HUMIDITY_THRESHOLD } from "../../constants";
import { openAlertModal } from "../../redux/slices/alertModalReducer";
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
      Cell: ({ value }: { value: string }) => {
        const dispatch = useDispatch();
        const numVal = parseInt(value);

        useEffect(() => {
          if (numVal > HUMIDITY_THRESHOLD) {
            dispatch(
              openAlertModal({
                heading: "Humidity exceeds!",
                content:
                  "Humidity is detected to be over the expected value of " +
                  HUMIDITY_THRESHOLD,
                type: "danger",
                ariaLabel: "",
              })
            );
          }
        }, [numVal, dispatch]);
        return <div>{pgDateToReadable(value)}</div>;
      },
    },
    {
      Header: "system status",
      accessor: "systemStatus",
    },
    {
      Header: "Timestamp",
      accessor: "createdAt",
      Cell: ({ value }: { value: string }) => {
        console.log("date value", value);
        return <div>{pgDateToReadable(value)}</div>;
      },
    },
  ];
};
