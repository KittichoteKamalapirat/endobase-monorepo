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
import { ColumnFilter } from "./ColumnFilter";

interface Props {
  pickEndo: any;
  refetchEndos: any;
  isLargerThanBreakpoint: boolean;
  currentPageIndex: number;
  status: ENDO_STATUS_VALUES | "";
  globalFilter: string;
}

export const endoColumns = ({
  pickEndo,
  refetchEndos,
  isLargerThanBreakpoint,
  currentPageIndex,
  status,
  globalFilter,
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
      Filter: ColumnFilter, // cause error without this line
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
      Filter: ColumnFilter,
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
      Filter: (data: any) => (
        <ColumnFilter
          status={status}
          column={data?.column}
          currentPageIndex={currentPageIndex}
          globalFilter={globalFilter}
        />
      ),
    },
    ...(isLargerThanBreakpoint
      ? [
          {
            Header: "Brand",
            accessor: "brand",
            Filter: ColumnFilter,
          },
        ]
      : []),

    ...(isLargerThanBreakpoint
      ? [
          {
            Header: "Model",
            accessor: "model",
            Filter: ColumnFilter,
          },
        ]
      : []),

    ...(isLargerThanBreakpoint
      ? [
          {
            Header: "Type",
            accessor: "type",
            Filter: ColumnFilter,
          },
        ]
      : []),

    ...(isLargerThanBreakpoint
      ? [
          {
            Header: "Storage Time",
            accessor: "lastPutBackISO",
            Filter: ColumnFilter,
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
      Filter: (data: any) => (
        <ColumnFilter
          status={status}
          column={data?.column}
          currentPageIndex={currentPageIndex}
          globalFilter={globalFilter}
        />
      ),
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
