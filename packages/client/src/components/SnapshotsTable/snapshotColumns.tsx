import { useEffect } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { Tooltip } from "react-tooltip";
import { json } from "stream/consumers";
import { HUMIDITY_THRESHOLD, ICON_SIZE } from "../../constants";
import { primaryColor } from "../../theme";
import { decodeSts } from "../../utils/decodeSts";
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
            // dispatch(
            //   openAlertModal({
            //     heading: "Humidity exceeds!",
            //     content:
            //       "Humidity is detected to be over the expected value of " +
            //       HUMIDITY_THRESHOLD,
            //     type: "danger",
            //     ariaLabel: "",
            //   })
            // );
          }
        }, [numVal, dispatch]);
        return <div>{pgDateToReadable(value)}</div>;
      },
    },
    {
      Header: "system status",
      accessor: "systemStatus",
      Cell: ({ value: status, row }: { value: string; row: any }) => {
        const rowId = row.original.id;
        const statusNum = Number(status);
        const decodedObj = decodeSts(statusNum);
        return (
          <div>
            <div
              id={rowId}
              className="flex gap-1 items-center hover:cursor-pointer"
            >
              <p>{status}</p>
              <IoMdInformationCircleOutline
                size={ICON_SIZE + 2}
                color={primaryColor}
              />
            </div>

            <Tooltip anchorId={rowId}>
              <div>
                {Object.keys(decodedObj).map((key) => {
                  return (
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="font-bold">{key}</div>
                        <div>
                          {decodedObj[key as keyof typeof decodedObj]
                            ? "True"
                            : "False"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Tooltip>
          </div>
        );
      },
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
