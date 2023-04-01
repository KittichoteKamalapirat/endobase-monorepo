import classNames from "classnames";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import { inactiveGrey, primaryColor } from "../../theme";
import Button, { ButtonTypes } from "../Buttons/Button";

interface Props {
  nextPage: () => void;
  previousPage: () => void;
  canNextPage: boolean;
  canPreviousPage: boolean;
  pageNum: number;
  setPageSize: (pageSize: number) => void;
  currPage: number;
  pageSize: number;
  setCurrPage?: React.Dispatch<React.SetStateAction<number>>;
  totalItemsCount?: number;
  className?: string
}

const PaginationControl = ({
  nextPage,
  previousPage,
  canNextPage,
  canPreviousPage,
  pageNum,
  currPage,
  totalItemsCount,
  className
}: Props) => {
  return (
    <div className={classNames("flex flex-col items-end mb-2", className)}>
      <div className="flex items-center gap-4">

        <BsFillCaretLeftFill onClick={() => previousPage()} color={canPreviousPage ? primaryColor : inactiveGrey} />

        <div id="page-indicator">
          <span className="font-bold">{currPage} </span> / {pageNum}
        </div>

        <BsFillCaretRightFill onClick={() => nextPage()} color={canNextPage ? primaryColor : inactiveGrey} />

      </div>

      <div className="flex flex-col items-end">
        {/* <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrPage && setCurrPage(1); // reset to 1 so it doesn't exceed (ex. 14/10)
          }}
          className="p-2 text-sm border border-gray-300 rounded-lg bg-gray-50"
        >
          {[10, 50, 100, 200].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select> */}
        {totalItemsCount ? (
          <p className={classNames("text-grey-500 text-sm")}>
            No. of results: {totalItemsCount}
          </p>
        ) : null}
      </div>
    </div>
  );
};
export default PaginationControl;
