// id, brand, model, type, storage time

import { bgConfig } from "../../utils/colorToTailwindBgColor";
import {
  ENDO_STATUS,
  ENDO_STATUS_VALUES,
  statusToColor,
} from "../../utils/statusToColor";
import Button, { ButtonTypes } from "../Buttons/Button";
import LinkButton from "../Buttons/LinkButton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";

interface Props {
  pickEndo: any;
  refetchEndos: any;
}

export const endoColumns = ({ pickEndo, refetchEndos }: Props) => {
  const handleUseEndo = async (id: string) => {
    await pickEndo({ variables: { id } });
    await refetchEndos(); // refetch so the link to /wash/null => /wash/session_id
  };
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
