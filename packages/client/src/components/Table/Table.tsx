import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const Table = ({ children, ...props }: Props) => {
  return (
    <table
      {...props}
      className="w-full text-md text-left text-gray-700 dark:text-gray-400"
    >
      {children}
    </table>
  );
};
export default Table;
