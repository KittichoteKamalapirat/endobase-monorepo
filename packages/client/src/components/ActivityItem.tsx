import { Action } from "../generated/graphql";

interface Props {
  action: Partial<Action>;
}

const ActivityItem = ({ action }: Props) => {
  const { id, officerId, type, passed } = action;
  return (
    <div key={id} className="border-solid border-grey-200 border-b-2">
      <div>Officer Number: {officerId}</div>
      <div>Acitvity: {type}</div>
      <div>Officer Number: {passed ? "passed" : "failed"}</div>
    </div>
  );
};
export default ActivityItem;
