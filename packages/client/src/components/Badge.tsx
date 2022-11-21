import React from "react";

interface Props {
  content: string;
  className: string;
}

const Badge = ({ content, className }: Props) => {
  return (
    <div
      role="badge"
      aria-label={`badge-${content}`}
      className={`${className} px-4 text-center flex max-w-min rounded-full`}
    >
      {content}
    </div>
  );
};

export default Badge;
