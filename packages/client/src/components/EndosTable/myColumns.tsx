// id, brand, model, type, storage time

import { bgConfig } from "../../utils/colorToTailwindBgColor";
import {
  ENDO_STATUS,
  ENDO_STATUS_VALUES,
  statusToColor,
} from "../../utils/statusToColor";
import Button from "../Buttons/Button";

export const myColumns = (pickEndo: any) => {
  const handleClick = (id: string) => {
    pickEndo({ variables: { id } });
  };
  return [
    {
      Header: "No.",
      accessor: "id",
    },
    {
      Header: "Brand",
      accessor: "brand",
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
      Header: "Action",
      // accessor: "id",
      Cell: ({ row }: { row: any }) => {
        const endoId = row.original.id as string;

        const notReadyStatuses = [
          ENDO_STATUS.BEING_USED,
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

        const isReady = readyStatuses.includes(row.original.status);
        const displayText = (() => {
          if (isReady) return "Use";
          if (notReadyStatuses.includes(row.original.status)) return "Waiting";
          if (toWashStatuses.includes(row.original.status)) return "Wash";
          return "";
        })();
        return (
          <div>
            {isReady ? (
              <Button label={displayText} onClick={() => handleClick(endoId)} />
            ) : (
              <div>{displayText}</div>
            )}
          </div>
        );
      },
    },
  ];
};
