import classNames from "classnames";

interface Props {
  content: string;
  color?: string;
  extraClass?: string;
  isActive?: boolean;
  activeColor?: string;
  size?: "sm" | "md";
}

const Badge = ({
  content,
  extraClass,
  isActive = false,
  activeColor = "",
  size = "sm",
  color = "text-primary-primary border-primary-primary",
}: Props) => {
  const commonClassName = "font-bold  border-[1px] border-solid rounded-md ";
  return (
    <div aria-label={`badge-${content}`}>
      <span
        className={classNames(
          commonClassName,
          color,
          extraClass,
          isActive && activeColor,
          size === "sm" ? "text-sm  py-[1px] px-1" : "text-md  py-[1px] px-1"
        )}
      >
        {content}
      </span>
    </div>
  );
};

export default Badge;
