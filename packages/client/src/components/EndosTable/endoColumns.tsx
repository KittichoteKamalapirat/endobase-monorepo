import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useDispatch } from "react-redux";
import { showToast } from "../../redux/slices/toastReducer";
import { bgConfig } from "../../utils/colorToTailwindBgColor";
import {
  ENDO_STATUS,
  ENDO_STATUS_VALUES,
  statusToColor,
} from "../../utils/statusToColor";
import Button, { ButtonTypes } from "../Buttons/Button";
import LinkButton from "../Buttons/LinkButton";

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
            <div className={`rounded-full w-2 h-2 mr-1 ${twBg}`}></div>
            <div>{value}</div>
          </div>
        );
      },
    },
    {
      Header: "Action",
      // accessor: "id",
      Cell: ({ row }: { row: any }) => {
        const dispatch = useDispatch();

        const handleUseEndo = async (id: string) => {
          try {
            await pickEndo({ variables: { id } });
            await refetchEndos(); // refetch so the link to /wash/null => /wash/session_id
            dispatch(
              showToast({
                message: "Drying time successfully updated!",
                variant: "success",
              })
            );
          } catch (error) {
            dispatch(
              showToast({
                message: "An error occured",
                variant: "error",
              })
            );
          }
        };

        const endoId = row.original.id as string;

        const notReadyStatuses = [
          ENDO_STATUS.PREWASHED,
          ENDO_STATUS.LEAK_TEST_FAILED,
          ENDO_STATUS.LEAK_TEST_PASSED,
          ENDO_STATUS.DISINFECTION_PASSED,
          ENDO_STATUS.DISINFECTION_FAILED,
          ENDO_STATUS.DRYING,
        ];

        const readyStatuses = [ENDO_STATUS.READY, ENDO_STATUS.EXPIRE_SOON];

        const toWashStatuses = [ENDO_STATUS.EXPIRED, ENDO_STATUS.EXPIRE_SOON];

        const currentStatus = row.original.status;

        const isReady = readyStatuses.includes(currentStatus);
        const displayText = (() => {
          if (isReady) return "Use";
          if (currentStatus === ENDO_STATUS.BEING_USED) return "Wash";
          if (toWashStatuses.includes(currentStatus)) return "Wash";
          if (notReadyStatuses.includes(currentStatus)) return "In use";

          return "";
        })();

        // direct to session page
        if (
          currentStatus === ENDO_STATUS.BEING_USED ||
          currentStatus === ENDO_STATUS.EXPIRED
        )
          return (
            <LinkButton
              label="wash"
              href={`/session/${row.original.currentSessionId}`}
              type={ButtonTypes.SECONDARY}
            />
          );
        return (
          <div>
            {isReady ? (
              <Button
                label={displayText}
                onClick={() => handleUseEndo(endoId)}
              />
            ) : (
              <div>{displayText}</div>
            )}
          </div>
        );
      },
    },
  ];
};
