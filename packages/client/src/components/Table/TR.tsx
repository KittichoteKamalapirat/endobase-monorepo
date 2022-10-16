import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const TR = ({ children, ...props }: Props) => {
  return <tr {...props}>{children}</tr>;
};
export default TR;
