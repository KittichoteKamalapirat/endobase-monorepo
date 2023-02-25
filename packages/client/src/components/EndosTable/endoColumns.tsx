import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { BsInboxesFill } from "react-icons/bs";
import { ICON_SIZE } from "../../constants";
import { primaryColor } from "../../theme";
// import { getCurrentBreakpoint } from "../../hooks/useScreenIsLargerThan";
import { CgHashtag } from "react-icons/cg";
import { TbActivityHeartbeat } from "react-icons/tb";
import { bgConfig } from "../../utils/colorToTailwindBgColor";
import { ENDO_STATUS_VALUES, statusToColor } from "../../utils/statusToColor";
import ActionColumn from "./endoActionColumn";

interface Props {
  pickEndo: any;
  refetchEndos: any;
  isLargerThanBreakpoint: boolean;
}

export const endoColumns = ({
  pickEndo,
  refetchEndos,
  isLargerThanBreakpoint,
}: Props) => {
  return [
    {
      Header: isLargerThanBreakpoint ? "Action" : "Action", // can't click if " "
      Cell: ({ row }: { row: any }) => (
        <ActionColumn
          row={row}
          pickEndo={pickEndo}
          refetchEndos={refetchEndos}
        />
      ),
    },
    {
      Header: isLargerThanBreakpoint ? (
        "Serial Num"
      ) : (
        <div className="mx-auto">
          {" "}
          <CgHashtag size={ICON_SIZE} color={primaryColor} />
        </div>
      ),
      accessor: "serialNum",
    },
    {
      Header: isLargerThanBreakpoint ? (
        "Location"
      ) : (
        <div className="mx-auto">
          {" "}
          <BsInboxesFill size={ICON_SIZE - 2} color={primaryColor} />
        </div>
      ),
      accessor: "position",
    },
    ...(isLargerThanBreakpoint
      ? [
          {
            Header: "Brand",
            accessor: "brand",
          },
        ]
      : []),

    ...(isLargerThanBreakpoint
      ? [
          {
            Header: "Model",
            accessor: "model",
          },
        ]
      : []),

    ...(isLargerThanBreakpoint
      ? [
          {
            Header: "Type",
            accessor: "type",
          },
        ]
      : []),

    ...(isLargerThanBreakpoint
      ? [
          {
            Header: "Storage Time",
            accessor: "lastPutBackISO",
            Cell: ({
              value: lastPubBackISO,
            }: {
              value: ENDO_STATUS_VALUES;
            }) => {
              dayjs.extend(relativeTime);
              const timeFromNow = dayjs(lastPubBackISO).fromNow(true);
              return <div>{timeFromNow}</div>;
            },
          },
        ]
      : []),

    {
      Header: isLargerThanBreakpoint ? (
        "Status"
      ) : (
        <div className="mx-auto">
          {" "}
          <TbActivityHeartbeat size={ICON_SIZE + 4} color={primaryColor} />
        </div>
      ),
      accessor: "status",
      Cell: ({ value }: { value: ENDO_STATUS_VALUES }) => {
        const color = statusToColor[value] as keyof typeof bgConfig;
        const twBg = bgConfig[color];

        return (
          <div className="flex items-center">
            <div
              id="color-dot"
              className={`rounded-full w-2 h-2 mr-1 ${twBg}`}
            ></div>
            <div>{value}</div>
          </div>
        );
      },
    },
  ];
};
