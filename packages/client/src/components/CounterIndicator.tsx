import React from "react";

interface Props {
  refetchCounter: number;
}

const CounterIndicator = ({ refetchCounter }: Props) => {
  return (
    <div className="mt-4 text-grey-600 text-sm">
      Time to update: In <span className="font-bold">{refetchCounter}</span>{" "}
      seconds
    </div>
  );
};
export default CounterIndicator;
