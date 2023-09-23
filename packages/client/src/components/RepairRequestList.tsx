import {
  RepairRequestsByEndoQuery,
  useRepairRequestsByEndoQuery,
} from "../generated/graphql";
import { CARD_CLASSNAMES } from "../theme";
import RepairRequestItem from "./RepairRequestItem";
import { Error } from "./skeletons/Error";
import { Loading } from "./skeletons/Loading";
import SubHeading from "./typography/SubHeading";

interface Props {
  endoId: string;
}

export type RepairRequestsQueryRepairRequest =
  RepairRequestsByEndoQuery["repairRequestsByEndo"][0];

const sortDateDesc = (
  a: RepairRequestsQueryRepairRequest,
  b: RepairRequestsQueryRepairRequest
) => {
  const result =
    new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
  return result;
};

const RepairRequestList = ({ endoId }: Props) => {
  const { data, loading, error } = useRepairRequestsByEndoQuery({
    variables: { endoId },
  });

  if (loading) return <Loading />;
  if (error) return <Error text="An error occured" />;

  return (
    <div className={CARD_CLASSNAMES}>
      <SubHeading heading="Repair History" />

      {data?.repairRequestsByEndo.length ? (
        <div>
          <div className="grid grid-cols-10 font-bold  text-lg mt-4">
            <div className="col-span-2 bg-grey-50 p-2">Date</div>
            <div className="col-span-2 bg-grey-50 p-2">Officer Number</div>
            <div className="col-span-2 bg-grey-50 p-2">Officer Name</div>
            <div className="col-span-2 bg-grey-50 p-2">Source</div>
            <div className="col-span-2 bg-grey-50 p-2">Note</div>
          </div>

          {data?.repairRequestsByEndo
            .slice()
            .sort(sortDateDesc)
            .map((repairRequest, index) => (
              <RepairRequestItem
                key={`repair-request-${index}`}
                index={index}
                repairRequest={repairRequest}
              />
            ))}
        </div>
      ) : (
        <div className="mt-4">This endoscope has no repair history</div>
      )}
    </div>
  );
};
export default RepairRequestList;
