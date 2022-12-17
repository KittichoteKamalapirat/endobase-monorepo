import { ApolloQueryResult } from "@apollo/client";
import classNames from "classnames";
import {
  ActionsQuery,
  ContainersQuery,
  EndosQuery,
  Exact,
  PaginatedActionsQuery,
  PaginatedSnapshotsQuery,
  SnapshotsQuery,
} from "../generated/graphql";
import { useRefetchCounter } from "../hooks/useRefetchCounter";

interface Props {
  refetch: (
    variables?:
      | Partial<
          Exact<{
            [key: string]: never;
          }>
        >
      | undefined
  ) => Promise<
    ApolloQueryResult<
      | ContainersQuery
      | EndosQuery
      | SnapshotsQuery
      | ActionsQuery
      | PaginatedSnapshotsQuery
      | PaginatedActionsQuery
    >
  >;
}

const CounterIndicator = ({ refetch }: Props) => {
  const refetchCounter = useRefetchCounter(refetch);
  return (
    <div className="mt-4 text-grey-600 text-sm">
      Time to update: In{" "}
      <span
        className={classNames(
          "font-bold",
          refetchCounter < 3 ? "animate-pulse-0.5 text-red-700" : "",
          refetchCounter > 58 ? "animate-pulse-0.5 text-green-700" : ""
        )}
      >
        {refetchCounter}
      </span>{" "}
      seconds
    </div>
  );
};
export default CounterIndicator;
