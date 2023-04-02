import SmallHeading from "./typography/SmallHeading";

interface Props {
  wasExpired: boolean
}
const NoPatientForm = ({ wasExpired }: Props) => {
  return (
    <div className="my-8">
      <SmallHeading heading="3. Patient Detail" />

      <div>
        No patient data required because this endoscope was {" "}
        <span className="font-bold">{wasExpired ? "Expired" : "Out of Order"}</span> .
      </div>
    </div>
  );
};
export default NoPatientForm;
