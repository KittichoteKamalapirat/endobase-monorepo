// id, brand, model, type, storage time

import { bgConfig } from "../../utils/colorToTailwindBgColor";
import {
  ENDO_STATUS,
  ENDO_STATUS_VALUES,
  statusToColor,
} from "../../utils/statusToColor";
import Button from "../Buttons/Button";
import LinkButton from "../Buttons/LinkButton";

interface Props {
  pickEndo: any;
  refetchEndos: any;
}

export const myColumns = ({ pickEndo, refetchEndos }: Props) => {
  const handleUseEndo = async (id: string) => {
    await pickEndo({ variables: { id } });
    await refetchEndos(); // refetch so the link to /wash/null => /wash/session_id
  };
  return [
    {
      Header: "ID",
      accessor: "id",
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
      accessor: "storageTime",
    },

    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value }: { value: ENDO_STATUS_VALUES }) => {
        const color = statusToColor[value] as keyof typeof bgConfig;
        const twBg = bgConfig[color];

        return (
          <div className="flex items-center">
            <div className={`rounded-full w-4 h-4 mr-1 ${twBg}`}></div>
            <div>{value}</div>
          </div>
        );
      },
    },
    {
      Header: "Action",
      // accessor: "id",
      Cell: ({ row }: { row: any }) => {
        const endoId = row.original.id as string;

        const notReadyStatuses = [
          ENDO_STATUS.PREWASHED,
          ENDO_STATUS.LEAK_TEST_FAILED,
          ENDO_STATUS.LEAK_TEST_PASSED,
          ENDO_STATUS.DISINFECTED,
          ENDO_STATUS.DRYING,
        ];

        const readyStatuses = [ENDO_STATUS.READY, ENDO_STATUS.EXPIRE_SOON];

        const toWashStatuses = [ENDO_STATUS.EXPIRED, ENDO_STATUS.EXPIRE_SOON];

        console.log(notReadyStatuses);
        console.log(readyStatuses);
        console.log(toWashStatuses);
        console.log(toWashStatuses);

        const currentStatus = row.original.status;

        const isReady = readyStatuses.includes(currentStatus);
        const displayText = (() => {
          if (isReady) return "Use";
          if (currentStatus === ENDO_STATUS.BEING_USED) return "wash";
          if (notReadyStatuses.includes(currentStatus)) return "In use";
          if (toWashStatuses.includes(currentStatus)) return "Wash";
          return "";
        })();

        // direct to session page
        if (currentStatus === ENDO_STATUS.BEING_USED)
          return (
            <LinkButton
              label="wash"
              href={`/session/${row.original.currentSessionId}`}
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
