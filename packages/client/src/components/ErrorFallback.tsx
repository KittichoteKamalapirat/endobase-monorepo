import { HiInformationCircle } from "react-icons/hi";
import { FallbackProps } from "react-error-boundary";
import Button, { HTMLButtonType } from "./Buttons/Button";
import SmallHeading from "./typography/SmallHeading";
import { ICON_SIZE } from "../constants";
import { red } from "../theme";

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <div className="flex flex-col items-center">
        <HiInformationCircle size={ICON_SIZE + 40} color={red} />
        <SmallHeading heading="Oop, an error occured." />
        <p className="max-w-lg">{error.message}</p>

        <Button
          label="Reload page"
          buttonType={HTMLButtonType.BUTTON}
          onClick={resetErrorBoundary}
          extraClass="mt-4"
        />
      </div>
    </div>
  );
};
export default ErrorFallback;
