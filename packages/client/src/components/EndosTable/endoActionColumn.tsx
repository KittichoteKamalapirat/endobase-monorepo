import { FaFan } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { showToast } from "../../redux/slices/toastReducer";
import { ENDO_STATUS } from "../../utils/statusToColor";
import Button, { ButtonTypes } from "../Buttons/Button";
import LinkButton from "../Buttons/LinkButton";

interface Props {
  pickEndo: any;
  refetchEndos: any;
  row: any;
}
const ActionColumn = ({ pickEndo, refetchEndos, row }: Props) => {
  const dispatch = useDispatch();

  const handleUseEndo = async (id: string) => {
    try {
      await pickEndo({ variables: { id } });
      await refetchEndos(); // refetch so the link to /wash/null => /wash/session_id
      dispatch(
        showToast({
          message: "Using the endoscope!",
          variant: "success",
        })
      );
    } catch (error) {
      dispatch(
        showToast({
          message: "An error occured",
          variant: "error",
        })
      );
    }
  };

  // 'ready', => use
  // 'expire_soon', => use
  //  'being_used', => wash
  //  'expired', => wash
  //  'leak_test_failed', => washing
  //  'leak_test_passed', => washing
  //  'disinfection_passed', => washing
  //  'disinfection_failed', => washing
  //  'drying', => drying

  const currentStatus = row.original.status;
  const endoId = row.original.id as string;

  switch (currentStatus) {
    case ENDO_STATUS.EXPIRE_SOON:
    case ENDO_STATUS.READY:
      return <Button label="Use" onClick={() => handleUseEndo(endoId)} />;

    case ENDO_STATUS.EXPIRED:
      return <Button label="Take out" onClick={() => handleUseEndo(endoId)} />;

    case ENDO_STATUS.BEING_USED:
    case ENDO_STATUS.EXPIRED_AND_OUT:
    case ENDO_STATUS.LEAK_TEST_FAILED:
      return (
        <LinkButton
          label="Wash"
          href={`/session/${row.original.currentSessionId}`}
          type={ButtonTypes.SECONDARY}
        />
      );

    case ENDO_STATUS.LEAK_TEST_PASSED:
    case ENDO_STATUS.DISINFECTION_FAILED:
      return (
        <LinkButton
          label="Disinfect"
          href={`/session/${row.original.currentSessionId}`}
          type={ButtonTypes.SECONDARY}
        />
      );

    case ENDO_STATUS.DISINFECTION_PASSED:
      return (
        <LinkButton
          label="Dry"
          href={`/session/${row.original.currentSessionId}`}
          type={ButtonTypes.SECONDARY}
        />
      );
    case ENDO_STATUS.DRYING:
      return (
        <div className="flex items-center gap-1">
          <FaFan /> <p>Drying</p>
        </div>
      );

    default:
      return null;
  }
};

export default ActionColumn;
