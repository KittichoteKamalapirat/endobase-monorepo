import classNames from "classnames";

import { ObjectValues } from "../types";

const SIZE = {
  SMALL: "sm",
  MEDIUM: "md",
  LARGE: "lg",
};

type Sizes = ObjectValues<typeof SIZE>;

interface Props {
  content: string;
  color?: string;
  extraClass?: string;
  isActive?: boolean;
  activeColor?: string;
  size?: Sizes;
  onClick?: (...args: any[]) => void;
}

const SIZE_CLASS_NAME: Record<Sizes, string> = {
  sm: "text-sm  py-[1px] px-1",
  md: "text-md  py-[1px] px-1",
  lg: "text-lg  py-[1px] px-4",
};

const Badge = ({
  content,
  extraClass,
  isActive = false,
  activeColor = "",
  size = "sm",
  color = "text-primary-primary border-primary-primary",
  onClick,
}: Props) => {
  const commonClassName = "font-bold  border-[1px] border-solid rounded-md ";
  return (
    <div
      aria-label={`badge-${content}`}
      onClick={onClick}
      className={classNames(onClick && "hover:cursor-pointer")}
    >
      <span
        className={classNames(
          commonClassName,
          color,
          extraClass,
          isActive && activeColor,
          SIZE_CLASS_NAME[size]
        )}
      >
        {content}
      </span>
    </div>
  );
};

export default Badge;
