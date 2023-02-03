import classNames from "classnames";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Tooltip } from "react-tooltip";
import { ICON_SIZE } from "../../constants";
import { primaryColor } from "../../theme";
import { decodeSts } from "../../utils/decodeSts";
import { pgDateToReadable } from "../../utils/pgDateToReadable";

interface Props {
  humThreshold: number
  tempThreshold: number
}
export const snapshotColumns = ({ humThreshold, tempThreshold }: Props) => {
  return [
    {
      Header: "Container",
      accessor: "container.col",
      Cell: ({ value: col }: { value: string }) => (
        <div>{col.toUpperCase()}</div>
      ),
    },
    {
      Header: "Temperature",
      accessor: "temp",
      Cell: ({ value: temp }: { value: number }) => {
        return <div className={classNames(temp > tempThreshold && "text-red")}>{temp}</div>
      }
    },
    {
      Header: "Humidity",
      accessor: "hum",
      Cell: ({ value: hum }: { value: number }) => {
        return <div className={classNames(hum > humThreshold && "text-red")}>{hum}</div>
      }

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
                    <div key={key}>
                      <div className="flex items-center gap-2">
                        <div className="font-bold">{key}:</div>
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
