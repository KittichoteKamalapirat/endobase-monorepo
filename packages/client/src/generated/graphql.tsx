import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Action = {
  __typename?: 'Action';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  officer: Officer;
  officerId: Scalars['String'];
  passed: Scalars['Boolean'];
  session: Session;
  sessionId: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Container = {
  __typename?: 'Container';
  col: Scalars['String'];
  createdAt: Scalars['DateTime'];
  currHum: Scalars['String'];
  currTemp: Scalars['String'];
  id: Scalars['ID'];
  snapshots: Array<Snapshot>;
  trays: Array<Tray>;
  updatedAt: Scalars['DateTime'];
};

export type CreateActionInput = {
  officerNum: Scalars['String'];
  passed: Scalars['Boolean'];
  sessionId: Scalars['String'];
  type: Scalars['String'];
};

export type CreateContainerInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type CreateEndoInput = {
  brand: Scalars['String'];
  model: Scalars['String'];
  trayId: Scalars['String'];
  type: Scalars['String'];
};

export type CreateOfficerInput = {
  officerNum: Scalars['String'];
};

export type CreatePatientInput = {
  /** Example field (placeholder) */
  hosNum: Scalars['String'];
};

export type CreateSessionInput = {
  /** For create a session for an endoscope */
  endoId: Scalars['String'];
};

export type CreateSnapshotInput = {
  containerId: Scalars['String'];
  hum: Scalars['String'];
  systemStatus: Scalars['String'];
  temp: Scalars['String'];
};

export type CreateTrayInput = {
  containerId: Scalars['String'];
  /** row inside a container */
  row: Scalars['Int'];
};

export type Endo = {
  __typename?: 'Endo';
  brand: Scalars['String'];
  createdAt: Scalars['DateTime'];
  currentSessionId?: Maybe<Scalars['String']>;
  dryingTime: Scalars['Int'];
  id: Scalars['ID'];
  lastPutBackISO: Scalars['String'];
  model: Scalars['String'];
  position: Scalars['String'];
  sessions: Array<Session>;
  status: Scalars['String'];
  tray?: Maybe<Tray>;
  trayId: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAction: Action;
  createContainer: Container;
  createEndo: Endo;
  createOfficer: Officer;
  createPatient: Patient;
  createSession: Session;
  createSnapshot: Snapshot;
  createTray: Tray;
  pickEndo: Endo;
  removeAction: Action;
  removeContainer: Container;
  removeOfficer: Officer;
  removePatient: Patient;
  removeSession: Session;
  removeTray: Tray;
  updateAction: Action;
  updateOfficer: Officer;
  updatePatient: Patient;
  updateSession: Session;
  updateSessionPatient: Session;
  updateTray: Tray;
};


export type MutationCreateActionArgs = {
  input: CreateActionInput;
};


export type MutationCreateContainerArgs = {
  createContainerInput: CreateContainerInput;
};


export type MutationCreateEndoArgs = {
  input: CreateEndoInput;
};


export type MutationCreateOfficerArgs = {
  createOfficerInput: CreateOfficerInput;
};


export type MutationCreatePatientArgs = {
  createPatientInput: CreatePatientInput;
};


export type MutationCreateSessionArgs = {
  input: CreateSessionInput;
};


export type MutationCreateSnapshotArgs = {
  createSnapshotInput: CreateSnapshotInput;
};


export type MutationCreateTrayArgs = {
  input: CreateTrayInput;
};


export type MutationPickEndoArgs = {
  id: Scalars['String'];
};


export type MutationRemoveActionArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveContainerArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveOfficerArgs = {
  id: Scalars['Int'];
};


export type MutationRemovePatientArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveSessionArgs = {
  id: Scalars['String'];
};


export type MutationRemoveTrayArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateActionArgs = {
  updateActionInput: UpdateActionInput;
};


export type MutationUpdateOfficerArgs = {
  updateOfficerInput: UpdateOfficerInput;
};


export type MutationUpdatePatientArgs = {
  updatePatientInput: UpdatePatientInput;
};


export type MutationUpdateSessionArgs = {
  updateSessionInput: UpdateSessionInput;
};


export type MutationUpdateSessionPatientArgs = {
  input: UpdateSessionPatientInput;
};


export type MutationUpdateTrayArgs = {
  updateTrayInput: UpdateTrayInput;
};

export type Officer = {
  __typename?: 'Officer';
  actions: Array<Action>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  officerNum: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Patient = {
  __typename?: 'Patient';
  createdAt: Scalars['DateTime'];
  hosNum: Scalars['String'];
  id: Scalars['ID'];
  sessions: Array<Session>;
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  action: Action;
  actions: Array<Action>;
  container: Container;
  containers: Array<Container>;
  endo: Endo;
  endos: Array<Endo>;
  officer: Officer;
  officers: Array<Officer>;
  patient: Patient;
  patients: Array<Patient>;
  session: Session;
  sessions: Array<Session>;
  tray: Tray;
  trays: Array<Tray>;
};


export type QueryActionArgs = {
  id: Scalars['Int'];
};


export type QueryContainerArgs = {
  id: Scalars['Int'];
};


export type QueryEndoArgs = {
  id: Scalars['String'];
};


export type QueryOfficerArgs = {
  id: Scalars['Int'];
};


export type QueryPatientArgs = {
  id: Scalars['String'];
};


export type QuerySessionArgs = {
  id: Scalars['String'];
};


export type QueryTrayArgs = {
  id: Scalars['Int'];
};

export type Session = {
  __typename?: 'Session';
  actions?: Maybe<Array<Action>>;
  createdAt: Scalars['DateTime'];
  endo: Endo;
  endoId: Scalars['String'];
  id: Scalars['ID'];
  isoEndTime?: Maybe<Scalars['String']>;
  patient?: Maybe<Patient>;
  patientId?: Maybe<Scalars['String']>;
  status: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Snapshot = {
  __typename?: 'Snapshot';
  container?: Maybe<Container>;
  containerId?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  hum: Scalars['String'];
  id: Scalars['ID'];
  systemStatus: Scalars['String'];
  temp: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Tray = {
  __typename?: 'Tray';
  container: Container;
  containerId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  endo?: Maybe<Endo>;
  id: Scalars['ID'];
  row: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type UpdateActionInput = {
  id: Scalars['Int'];
  officerNum?: InputMaybe<Scalars['String']>;
  passed?: InputMaybe<Scalars['Boolean']>;
  sessionId?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type UpdateOfficerInput = {
  id: Scalars['Int'];
  officerNum?: InputMaybe<Scalars['String']>;
};

export type UpdatePatientInput = {
  /** Example field (placeholder) */
  hosNum?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
};

export type UpdateSessionInput = {
  endTime?: InputMaybe<Scalars['String']>;
  /** For create a session for an endoscope */
  endoId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  patientHN?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
};

export type UpdateSessionPatientInput = {
  id?: InputMaybe<Scalars['String']>;
  patientHN: Scalars['String'];
};

export type UpdateTrayInput = {
  containerId?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  /** row inside a container */
  row?: InputMaybe<Scalars['Int']>;
};

export type ContainersQueryVariables = Exact<{ [key: string]: never; }>;


export type ContainersQuery = { __typename?: 'Query', containers: Array<{ __typename?: 'Container', id: string, col: string, currTemp: string, currHum: string }> };

export type PickEndoMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type PickEndoMutation = { __typename?: 'Mutation', pickEndo: { __typename?: 'Endo', id: string, trayId: string, brand: string, type: string, model: string, status: string } };

export type EndosQueryVariables = Exact<{ [key: string]: never; }>;


export type EndosQuery = { __typename?: 'Query', endos: Array<{ __typename?: 'Endo', id: string, trayId: string, brand: string, type: string, model: string, status: string, currentSessionId?: string | null, lastPutBackISO: string, position: string, tray?: { __typename?: 'Tray', id: string, row: number, container: { __typename?: 'Container', id: string, col: string } } | null }> };

export type CreateActionMutationVariables = Exact<{
  input: CreateActionInput;
}>;


export type CreateActionMutation = { __typename?: 'Mutation', createAction: { __typename?: 'Action', id: string, type: string, passed: boolean, sessionId: string } };

export type UpdateSessionPatientMutationVariables = Exact<{
  input: UpdateSessionPatientInput;
}>;


export type UpdateSessionPatientMutation = { __typename?: 'Mutation', updateSessionPatient: { __typename?: 'Session', id: string, endoId: string, status: string, patientId?: string | null } };

export type SessionQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type SessionQuery = { __typename?: 'Query', session: { __typename?: 'Session', id: string, endoId: string, status: string, patientId?: string | null, patient?: { __typename?: 'Patient', id: string, hosNum: string } | null, actions?: Array<{ __typename?: 'Action', id: string, passed: boolean, type: string, officerId: string, officer: { __typename?: 'Officer', id: string, officerNum: string } }> | null } };


export const ContainersDocument = gql`
    query Containers {
  containers {
    id
    col
    currTemp
    currHum
  }
}
    `;

/**
 * __useContainersQuery__
 *
 * To run a query within a React component, call `useContainersQuery` and pass it any options that fit your needs.
 * When your component renders, `useContainersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContainersQuery({
 *   variables: {
 *   },
 * });
 */
export function useContainersQuery(baseOptions?: Apollo.QueryHookOptions<ContainersQuery, ContainersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ContainersQuery, ContainersQueryVariables>(ContainersDocument, options);
      }
export function useContainersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ContainersQuery, ContainersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ContainersQuery, ContainersQueryVariables>(ContainersDocument, options);
        }
export type ContainersQueryHookResult = ReturnType<typeof useContainersQuery>;
export type ContainersLazyQueryHookResult = ReturnType<typeof useContainersLazyQuery>;
export type ContainersQueryResult = Apollo.QueryResult<ContainersQuery, ContainersQueryVariables>;
export const PickEndoDocument = gql`
    mutation pickEndo($id: String!) {
  pickEndo(id: $id) {
    id
    trayId
    brand
    type
    model
    status
  }
}
    `;
export type PickEndoMutationFn = Apollo.MutationFunction<PickEndoMutation, PickEndoMutationVariables>;

/**
 * __usePickEndoMutation__
 *
 * To run a mutation, you first call `usePickEndoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePickEndoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pickEndoMutation, { data, loading, error }] = usePickEndoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePickEndoMutation(baseOptions?: Apollo.MutationHookOptions<PickEndoMutation, PickEndoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PickEndoMutation, PickEndoMutationVariables>(PickEndoDocument, options);
      }
export type PickEndoMutationHookResult = ReturnType<typeof usePickEndoMutation>;
export type PickEndoMutationResult = Apollo.MutationResult<PickEndoMutation>;
export type PickEndoMutationOptions = Apollo.BaseMutationOptions<PickEndoMutation, PickEndoMutationVariables>;
export const EndosDocument = gql`
    query endos {
  endos {
    id
    trayId
    brand
    type
    model
    status
    currentSessionId
    lastPutBackISO
    position
    tray {
      id
      row
      container {
        id
        col
      }
    }
  }
}
    `;

/**
 * __useEndosQuery__
 *
 * To run a query within a React component, call `useEndosQuery` and pass it any options that fit your needs.
 * When your component renders, `useEndosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEndosQuery({
 *   variables: {
 *   },
 * });
 */
export function useEndosQuery(baseOptions?: Apollo.QueryHookOptions<EndosQuery, EndosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EndosQuery, EndosQueryVariables>(EndosDocument, options);
      }
export function useEndosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EndosQuery, EndosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EndosQuery, EndosQueryVariables>(EndosDocument, options);
        }
export type EndosQueryHookResult = ReturnType<typeof useEndosQuery>;
export type EndosLazyQueryHookResult = ReturnType<typeof useEndosLazyQuery>;
export type EndosQueryResult = Apollo.QueryResult<EndosQuery, EndosQueryVariables>;
export const CreateActionDocument = gql`
    mutation createAction($input: CreateActionInput!) {
  createAction(input: $input) {
    id
    type
    passed
    sessionId
  }
}
    `;
export type CreateActionMutationFn = Apollo.MutationFunction<CreateActionMutation, CreateActionMutationVariables>;

/**
 * __useCreateActionMutation__
 *
 * To run a mutation, you first call `useCreateActionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateActionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createActionMutation, { data, loading, error }] = useCreateActionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateActionMutation(baseOptions?: Apollo.MutationHookOptions<CreateActionMutation, CreateActionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateActionMutation, CreateActionMutationVariables>(CreateActionDocument, options);
      }
export type CreateActionMutationHookResult = ReturnType<typeof useCreateActionMutation>;
export type CreateActionMutationResult = Apollo.MutationResult<CreateActionMutation>;
export type CreateActionMutationOptions = Apollo.BaseMutationOptions<CreateActionMutation, CreateActionMutationVariables>;
export const UpdateSessionPatientDocument = gql`
    mutation updateSessionPatient($input: UpdateSessionPatientInput!) {
  updateSessionPatient(input: $input) {
    id
    endoId
    status
    patientId
  }
}
    `;
export type UpdateSessionPatientMutationFn = Apollo.MutationFunction<UpdateSessionPatientMutation, UpdateSessionPatientMutationVariables>;

/**
 * __useUpdateSessionPatientMutation__
 *
 * To run a mutation, you first call `useUpdateSessionPatientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSessionPatientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSessionPatientMutation, { data, loading, error }] = useUpdateSessionPatientMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSessionPatientMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSessionPatientMutation, UpdateSessionPatientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSessionPatientMutation, UpdateSessionPatientMutationVariables>(UpdateSessionPatientDocument, options);
      }
export type UpdateSessionPatientMutationHookResult = ReturnType<typeof useUpdateSessionPatientMutation>;
export type UpdateSessionPatientMutationResult = Apollo.MutationResult<UpdateSessionPatientMutation>;
export type UpdateSessionPatientMutationOptions = Apollo.BaseMutationOptions<UpdateSessionPatientMutation, UpdateSessionPatientMutationVariables>;
export const SessionDocument = gql`
    query Session($id: String!) {
  session(id: $id) {
    id
    endoId
    status
    patientId
    patient {
      id
      hosNum
    }
    actions {
      id
      passed
      type
      officerId
      officer {
        id
        officerNum
      }
    }
  }
}
    `;

/**
 * __useSessionQuery__
 *
 * To run a query within a React component, call `useSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSessionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSessionQuery(baseOptions: Apollo.QueryHookOptions<SessionQuery, SessionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SessionQuery, SessionQueryVariables>(SessionDocument, options);
      }
export function useSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SessionQuery, SessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SessionQuery, SessionQueryVariables>(SessionDocument, options);
        }
export type SessionQueryHookResult = ReturnType<typeof useSessionQuery>;
export type SessionLazyQueryHookResult = ReturnType<typeof useSessionLazyQuery>;
export type SessionQueryResult = Apollo.QueryResult<SessionQuery, SessionQueryVariables>;