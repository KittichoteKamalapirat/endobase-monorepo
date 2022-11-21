import { ReactNode } from "react";
import { Link } from "react-router-dom";
import Badge from "../Badge";

interface Props {
  children: ReactNode;
  href?: string;
  isActive: boolean;

  badgeContent?: string;
  onClick?: () => void;
}

const Tab = ({
  children,
  href,
  isActive,
  badgeContent,

  onClick,
}: Props) => {
  const tabClass = (() => {
    const commonClass = "py-1 px-6";

    const selectedTabClass = isActive
      ? "text-grey-0 font-bold bg-primary-primary"
      : "text-grey-500 hover:bg-primary-50 hover:rounded-md";

    return `${commonClass} ${selectedTabClass}`;
  })();

  return (
    <Link to={href || ""} onClick={onClick} className={tabClass}>
      <div className="relative">
        {children}

        {badgeContent && (
          <Badge
            className={`-right-5 bottom-3 text-white absolute text-xxxs px-2 float-right ${
              badgeContent === "0" ? "bg-grey-325" : "bg-blurple-link"
            }`}
            content={badgeContent}
          />
        )}
      </div>
    </Link>
  );
};

export default Tab;
