import classNames from "classnames";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import { inactiveGrey, primaryColor } from "../../theme";

interface Props {
  nextPage: () => void;
  previousPage: () => void;
  canNextPage: boolean;
  canPreviousPage: boolean;
  pageNum: number;
  currPage: number;
  pageSize: number;
  setCurrPage?: React.Dispatch<React.SetStateAction<number>>;
  totalItemsCount?: number;
  className?: string
}

const ManualPaginationControl = ({
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

        {totalItemsCount ? (
          <p className={classNames("text-grey-500 text-sm")}>
            No. of results: {totalItemsCount}
          </p>
        ) : null}
      </div>
    </div>
  );
};
export default ManualPaginationControl;
