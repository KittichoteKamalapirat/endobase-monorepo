import { ApolloQueryResult } from "@apollo/client";
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
      Time to update: In <span className="font-bold">{refetchCounter}</span>{" "}
      seconds
    </div>
  );
};
export default CounterIndicator;
