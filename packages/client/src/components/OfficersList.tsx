import classNames from "classnames";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ICON_SIZE } from "../constants";
import {
  useDeleteOfficerMutation,
  useOfficersQuery,
} from "../generated/graphql";
import { urlResolver } from "../lib/UrlResolver";
import { showToast } from "../redux/slices/toastReducer";
import { grey0 } from "../theme";
import LinkButton from "./Buttons/LinkButton";
import { Error } from "./skeletons/Error";
import { Loading } from "./skeletons/Loading";
import SubHeading from "./typography/SubHeading";
import {
  OFFICER_TYPE_OBJ,
  OFFICER_TYPE_VALUES,
} from "../utils/officerTypeToLabel";

const OfficersList = () => {
  const { data, loading, error, refetch } = useOfficersQuery();
  const [deleteOfficer] = useDeleteOfficerMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteOfficer = async (id: string) => {
    try {
      const result = await deleteOfficer({
        variables: {
          id,
        },
      });

      const resultValue = result.data?.deleteOfficer.value;

      let errorMessage = "";
      const resultUserErrors = result.data?.deleteOfficer.errors || [];
      resultUserErrors.map(({ message }) => {
        errorMessage += `${message}\n`;
      });

      if (resultValue && resultUserErrors.length === 0) {
        dispatch(
          showToast({
            message: "Successfully delete an officer",
            variant: "success",
          })
        );
        refetch();
      } else {
        dispatch(
          showToast({
            message: errorMessage,
            variant: "error",
          })
        );
      }
    } catch (error) {
      console.error("error", error);
    }
  };
  if (loading) return <Loading />;
  if (error) return <Error text="Error retrieving setting" />;
  return (
    <div className="mt-4">
      <div className="flex justify-between items-end">
        <SubHeading heading="Officers" />
        <LinkButton
          startIcon={<AiOutlinePlus size={ICON_SIZE} color={grey0} />}
          label="Add an officer"
          href={urlResolver.createOfficer()}
        />
      </div>

      <div className="mt-4 border">
        <div className="grid grid-cols-12 font-bold text-lg">
          <div className="col-span-2 bg-grey-50 p-2">#</div>
          <div className="col-span-2 bg-grey-50 p-2">Officer Number</div>
          <div className="col-span-2 bg-grey-50 p-2">First Name</div>
          <div className="col-span-2 bg-grey-50 p-2">Last Name</div>
          <div className="col-span-2 bg-grey-50 p-2">Type</div>
          <div className="col-span-2 bg-grey-50 p-2"></div>
        </div>
        {data?.officers.map((officer, index) => (
          <div className="grid grid-cols-12 " key={index}>
            <div
              className={classNames(
                "col-span-2 p-2",
                index % 2 === 0 && "bg-primary-50"
              )}
            >
              {index + 1}
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
              {officer.firstName}
            </div>
            <div
              className={classNames(
                "col-span-2 p-2",
                index % 2 === 0 && "bg-primary-50"
              )}
            >
              {officer.lastName}
            </div>
            <div
              className={classNames(
                "col-span-2 p-2",
                index % 2 === 0 && "bg-primary-50"
              )}
            >
              {OFFICER_TYPE_OBJ[officer.type as OFFICER_TYPE_VALUES]}
            </div>
            <div
              className={classNames(
                "col-span-2 p-2 flex gap-2",
                index % 2 === 0 && "bg-primary-50"
              )}
            >
              <button
                className="hover:cursor-pointer hover:bg-green-100 rounded-full p-1"
                onClick={() => navigate(urlResolver.editOfficer(officer.id))}
              >
                <AiOutlineEdit size={ICON_SIZE + 4} />
              </button>

              <button
                className="hover:cursor-pointer hover:bg-red-100 rounded-full p-1"
                onClick={() => handleDeleteOfficer(officer.id)}
              >
                <HiOutlineTrash size={ICON_SIZE + 4} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default OfficersList;
