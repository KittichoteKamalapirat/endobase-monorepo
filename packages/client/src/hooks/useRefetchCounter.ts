import { ApolloQueryResult } from "@apollo/client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_CLIENT_DATA_MINUTE_INTERVAL } from "../constants";
import {
  ActionsQuery,
  ContainersQuery,
  EndosQuery,
  Exact,
  PaginatedActionsQuery,
  PaginatedSnapshotsQuery,
  SnapshotsQuery,
} from "../generated/graphql";
import { updateSaveCount } from "../redux/slices/saveCountReducer";
import { RootState } from "../redux/store";

const defaultSecs = UPDATE_CLIENT_DATA_MINUTE_INTERVAL * 60;

export const useRefetchCounter = (
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
  >
) => {
  const lastCount = useSelector((state: RootState) => state.saveCount);
  const [refetchCounter, setRefetchCounter] = useState(lastCount);

  const dispatch = useDispatch();

  // count and refetch from db (db is auto updated every 1 min in the backend)
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (refetchCounter <= 0) {
        refetch();
        setRefetchCounter(defaultSecs);
      } else {
        setRefetchCounter(refetchCounter - 1);
      }
    }, 1000);

    return () => {
      dispatch(updateSaveCount(refetchCounter)); // save the current count in global state
      clearInterval(intervalId);
    };
  }, [dispatch, refetch, refetchCounter]);

  return refetchCounter;
};
