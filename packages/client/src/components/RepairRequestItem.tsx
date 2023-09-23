import classNames from "classnames";
import dayjs from "dayjs";
import { RepairRequestsQueryRepairRequest } from "./RepairRequestList";

interface Props {
  repairRequest: RepairRequestsQueryRepairRequest;
  index: number;
}

export type REPAIR_REQUEST_SRC =
  | "leak_test" // รั่วเลยเรียกช่าง (from session page)
  | "disinfection" // // เฟลเลยเรียกช่าง (from session page)
  | "wait_repair" // เป็นไรไม่รู้ รอช่างมาดู
  | "request_repair"; // ช่างเอากล้องไปแล้ว

const sourceToLabelMapper: Record<REPAIR_REQUEST_SRC, string> = {
  leak_test: "Leak test",
  disinfection: "Disinfection",
  wait_repair: "Wait repair",
  request_repair: "Request repair",
} as const;

const RepairRequestItem = ({ index, repairRequest }: Props) => {
  const { id, note, officer, createdAt, source } = repairRequest || {};

  return (
    <div className="grid grid-cols-10 " key={id}>
      <div
        className={classNames(
          "col-span-2 p-2",
          index % 2 === 0 && "bg-primary-50"
        )}
      >
        {dayjs(createdAt).format("DD/MM/YYYY")}
      </div>
      <div
        className={classNames(
          "col-span-2 p-2",
          index % 2 === 0 && "bg-primary-50"
        )}
      >
        {officer.officerNum}
      </div>

      <div
        className={classNames(
          "col-span-2 p-2",
          index % 2 === 0 && "bg-primary-50"
        )}
      >
        {`${officer.firstName} ${officer.lastName}`}
      </div>

      <div
        className={classNames(
          "col-span-2 p-2",
          index % 2 === 0 && "bg-primary-50"
        )}
      >
        {sourceToLabelMapper[source as REPAIR_REQUEST_SRC]}
      </div>

      <div
        className={classNames(
          "col-span-2 p-2 flex gap-2",
          index % 2 === 0 && "bg-primary-50"
        )}
      >
        {note}
      </div>
    </div>
  );
};
export default RepairRequestItem;
