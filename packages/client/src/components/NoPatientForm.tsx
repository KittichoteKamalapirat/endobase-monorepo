import { ENDO_STATUS_VALUES } from "../utils/statusToColor";
import { statusToLabel } from "../utils/statusToLabel";
import SmallHeading from "./typography/SmallHeading";

interface Props {
  status: ENDO_STATUS_VALUES
}
const NoPatientForm = ({ status }: Props) => {
  return (
    <div className="my-8">
      <SmallHeading heading="2. Patient Detail" />

      <div>
        No patient data required because the status of this endoscope is {" "}
        <span className="font-bold">{statusToLabel[status]}</span> .
      </div>
    </div>
  );
};
export default NoPatientForm;
