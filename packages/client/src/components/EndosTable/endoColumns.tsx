import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { bgConfig } from "../../utils/colorToTailwindBgColor";
import { ENDO_STATUS_VALUES, statusToColor } from "../../utils/statusToColor";
import ActionColumn from "./endoActionColumn";

interface Props {
  pickEndo: any;
  refetchEndos: any;
}

export const endoColumns = ({ pickEndo, refetchEndos }: Props) => {
  return [
    {
      Header: "Serial",
      accessor: "serialNum",
    },
    {
      Header: "Location",
      accessor: "position",
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
      accessor: "lastPutBackISO",
      Cell: ({ value: lastPubBackISO }: { value: ENDO_STATUS_VALUES }) => {
        dayjs.extend(relativeTime);
        const timeFromNow = dayjs(lastPubBackISO).fromNow(true);
        return <div>{timeFromNow}</div>;
      },
    },

    {
      Header: "Status",
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
    {
      Header: "Action",
      // accessor: "id",
      Cell: ({ row }: { row: any }) => (
        <ActionColumn
          row={row}
          pickEndo={pickEndo}
          refetchEndos={refetchEndos}
        />
      ),
    },
  ];
};
