import classNames from "classnames";
import { Link } from "react-router-dom";
import { Endo } from "../generated/graphql";
import { ACTION_CARD_CLASSNAMES, UNCLICKABLE_CARD_CLASSNAMES } from "../theme";
import Badge from "./Badge";
import SubHeading from "./typography/SubHeading";

interface Props {
  endo: Endo;
  canBeClicked?: boolean;
}

const EndoDetail = ({ endo, canBeClicked = true }: Props) => {
  const { serialNum, dryingTime, status, brand, type, model, position } =
    endo || {};

  if (!endo) return null;

  return (
    <Link to={`/endo/${endo.id}`}>
      <div
        className={classNames(
          canBeClicked ? ACTION_CARD_CLASSNAMES : UNCLICKABLE_CARD_CLASSNAMES
        )}
      >
        <SubHeading heading="Endoscope Detail" />
        <div className="flex gap-10 mt-4">
          <div id="left" className="font-bold">
            <div>Serial</div>
            <div>Location</div>
            <div>Brand</div>
            <div>Model</div>
            <div>Type</div>
            <div>Drying Time</div>
            <div>Status</div>

          </div>

          <div id="right">
            <div>{serialNum}</div>
            <div>{position}</div>
            <div>{brand}</div>
            <div>{model}</div>
            <div>{type}</div>
            <div>{dryingTime} minutes</div>
            <div > <Badge content={status} /> </div>

          </div>
        </div>
      </div>
    </Link>
  );
};
export default EndoDetail;
