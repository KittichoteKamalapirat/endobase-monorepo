import React from "react";

interface LoadingProps {
  text?: string;
  overlay?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ text }) => {
  return (
    <div
      role="status"
      className="p-4 space-y-4 max-w-md rounded border border-gray-200 divide-y divide-gray-200 shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};
