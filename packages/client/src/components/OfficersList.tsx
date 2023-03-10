import classNames from "classnames";
import { useOfficersQuery } from "../generated/graphql";
import { Error } from "./skeletons/Error";
import { Loading } from "./skeletons/Loading";
import SubHeading from "./typography/SubHeading";

const OfficersList = () => {
  const { data, loading, error } = useOfficersQuery();

  if (loading) return <Loading />;
  if (error) return <Error text="Error retrieving setting" />;
  return (
    <div className="mt-4">
      <SubHeading heading="Officers" />

      <div className="w-full lg:w-3/4 border">
        <div className="grid grid-cols-13 font-bold  text-lg">
          <div className="col-span-1 bg-grey-50 p-2">#</div>
          <div className="col-span-4 bg-grey-50 p-2">Officer Number</div>
          <div className="col-span-4 bg-grey-50 p-2">First Name</div>
          <div className="col-span-4 bg-grey-50 p-2">Last Name</div>
        </div>
        {data?.officers.map((officer, index) => (
          <div className="grid grid-cols-13 ">
            <div
              className={classNames(
                "col-span-1 p-2",
                index % 2 === 0 && "bg-primary-50"
              )}
            >
              {index + 1}
            </div>
            <div
              className={classNames(
                "col-span-4 p-2",
                index % 2 === 0 && "bg-primary-50"
              )}
            >
              {officer.officerNum}
            </div>
            <div
              className={classNames(
                "col-span-4 p-2",
                index % 2 === 0 && "bg-primary-50"
              )}
            >
              {officer.firstName}
            </div>
            <div
              className={classNames(
                "col-span-4 p-2",
                index % 2 === 0 && "bg-primary-50"
              )}
            >
              {officer.lastName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default OfficersList;
