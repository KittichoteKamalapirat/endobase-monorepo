import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const TD = ({ children, ...props }: Props) => {
  return (
    <td {...props} className="py-4 px-6">
      {children}
    </td>
  );
};
export default TD;
