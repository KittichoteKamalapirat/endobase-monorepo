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
};

export type Container = {
  __typename?: 'Container';
  id: Scalars['ID'];
  trays: Array<Tray>;
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

export type CreateTrayInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type Endo = {
  __typename?: 'Endo';
  brand: Scalars['String'];
  id: Scalars['ID'];
  model: Scalars['String'];
  status: Scalars['String'];
  tray: Tray;
  trayId: Scalars['String'];
  type: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createContainer: Container;
  createEndo: Endo;
  createTray: Tray;
  removeContainer: Container;
  removeTray: Tray;
  updateContainer: Container;
  updateTray: Tray;
  useEndo: Endo;
};


export type MutationCreateContainerArgs = {
  createContainerInput: CreateContainerInput;
};


export type MutationCreateEndoArgs = {
  input: CreateEndoInput;
};


export type MutationCreateTrayArgs = {
  createTrayInput: CreateTrayInput;
};


export type MutationRemoveContainerArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveTrayArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateContainerArgs = {
  updateContainerInput: UpdateContainerInput;
};


export type MutationUpdateTrayArgs = {
  updateTrayInput: UpdateTrayInput;
};


export type MutationUseEndoArgs = {
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  container: Container;
  containers: Array<Container>;
  endo: Endo;
  endos: Array<Endo>;
  tray: Tray;
  trays: Array<Tray>;
};


export type QueryContainerArgs = {
  id: Scalars['Int'];
};


export type QueryEndoArgs = {
  id: Scalars['String'];
};


export type QueryTrayArgs = {
  id: Scalars['Int'];
};

export type Tray = {
  __typename?: 'Tray';
  container: Container;
  containerId: Scalars['String'];
  endo: Endo;
  id: Scalars['ID'];
  row: Scalars['Float'];
};

export type UpdateContainerInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdateTrayInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type EndosQueryVariables = Exact<{ [key: string]: never; }>;


export type EndosQuery = { __typename?: 'Query', endos: Array<{ __typename?: 'Endo', id: string, trayId: string, brand: string, type: string, model: string }> };


export const EndosDocument = gql`
    query endos {
  endos {
    id
    trayId
    brand
    type
    model
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