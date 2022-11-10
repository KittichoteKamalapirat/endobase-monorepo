import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}
const TR = ({ children, className, ...props }: Props) => {
  return (
    <tr {...props} className={className}>
      {children}
    </tr>
  );
};
export default TR;
