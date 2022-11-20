import { CARD_CLASSNAMES } from "../theme";
import SmallHeading from "./typography/SmallHeading";

const NoPatientForm = () => {
  return (
    <div className={CARD_CLASSNAMES}>
      <SmallHeading heading="Patient Detail" />

      <div>
        No patient data required because this endoscope is{" "}
        <span className="font-bold">expired</span> .
      </div>
    </div>
  );
};
export default NoPatientForm;
