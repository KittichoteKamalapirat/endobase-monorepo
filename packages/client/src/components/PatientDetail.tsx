import classNames from "classnames";
import { Patient } from "../generated/graphql";
import { CARD_CLASSNAMES } from "../theme";
import SubHeading from "./typography/SubHeading";

interface Props {
  patient: Patient;
}

const PatientDetail = ({ patient }: Props) => {
  const { hosNum } = patient || {};

  if (!patient) return null;

  return (
    <div className={classNames(CARD_CLASSNAMES)}>
      <SubHeading heading="Patient Detail" />
      <div className="flex gap-10 mt-4">
        <div id="left" className="font-bold">
          <div>Hospital Number &#40;HN&#41;</div>
        </div>

        <div id="right">
          <div>{hosNum}</div>
        </div>
      </div>
    </div>
  );
};
export default PatientDetail;
