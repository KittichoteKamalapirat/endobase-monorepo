import dayjs from "dayjs";
import { Action } from "../generated/graphql";
import { ACTION_TYPE_VALUES } from "../utils/actionTypeToLabel";
import { getActionLabel } from "../utils/getActionStep";
import HDivider from "./layouts/HDivider";
import SmallHeading from "./typography/SmallHeading";
import clsx from "clsx";

interface Props {
  action: Partial<Action>;
  showHeading?: boolean;
  showPassed?: boolean;
}

const ActivityItem = ({
  showHeading = true,
  showPassed = true,
  action,
}: Props) => {
  const { officer, passed, createdAt, type } = action || {};

  return (
    <div>
      {showHeading && (
        <SmallHeading
          heading={getActionLabel(type as ACTION_TYPE_VALUES)}
          extraClass="text-grey-500"
        />
      )}
      <div className="flex gap-10 mt-2">
        <div id="left" className="font-bold">
          <div>Officer Number</div>
          <div>Timestamp</div>
          {showPassed && <div>Status</div>}
        </div>

        <div id="right">
          <div>{officer?.officerNum}</div>
          <div>
            <span>{dayjs(createdAt).format("HH:mm")}, </span>
            <span className="text-grey-500">
              {dayjs(createdAt).format("DD/MM/YYYY ")}
            </span>
          </div>
          {showPassed && (
            <div
              className={clsx(
                "font-bold",
                passed ? "text-green-500" : "text-red-500"
              )}
            >
              {passed ? "Passed" : "Failed"}
            </div>
          )}
        </div>
      </div>

      <HDivider extraClass="my-4" />
    </div>
  );
};
export default ActivityItem;
