import { Patient } from "../generated/graphql";
import HDivider from "./layouts/HDivider";
import SmallHeading from "./typography/SmallHeading";

interface Props {
  patient: Patient;
}

const PatientDetail = ({ patient }: Props) => {
  const { hosNum } = patient || {};

  if (!patient) return null;

  return (
    <div>
      <SmallHeading
        heading="Who used this endoscope?"
        extraClass="text-grey-500"
      />
      <div className="flex gap-10 mt-4">
        <div id="left" className="font-bold">
          <div>Hospital Number &#40;HN&#41;</div>
        </div>

        <div id="right">
          <div>{hosNum}</div>
        </div>
      </div>

      <HDivider extraClass="my-4" />
    </div>
  );
};
export default PatientDetail;
