import CreateTakeOutActionForm from "./CreateTakeOutActionForm";
import UpdateTakeOutActionForm from "./UpdateTakeOutActionForm";

interface Props {
  endoId: string; // for refetch
  className?: string;
  routeOfficerNum?: string;
  //   action: ActionsQuery["actions"][number];
  //   action: SessionQuery["session"]["actions"][number];
  action?: any; // TODO
}

const TakeoutFormWrapper = ({
  endoId,
  className,
  routeOfficerNum,
  action,
}: Props) => {
  const actionId = action?.id;
  return (
    <div className={className}>
      {actionId ? (
        <UpdateTakeOutActionForm
          actionId={actionId}
          endoId={endoId}
          initialValues={{
            officerNum: action?.officer.officerNum,
            note: action?.note || "",
            method: "update",
            adminCredential: "",
          }}
        />
      ) : (
        <CreateTakeOutActionForm
          endoId={endoId}
          initialValues={{
            officerNum: routeOfficerNum || "",
            note: "",
            method: "create",
          }}
        />
      )}
    </div>
  );
};
export default TakeoutFormWrapper;
