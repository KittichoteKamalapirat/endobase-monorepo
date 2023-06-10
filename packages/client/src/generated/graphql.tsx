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

export type ActionResponse = {
  __typename?: 'ActionResponse';
  action?: Maybe<Action>;
  errors?: Maybe<Array<FieldError>>;
};

export type BooleanResponse = {
  __typename?: 'BooleanResponse';
  errors?: Maybe<Array<FieldError>>;
  value?: Maybe<Scalars['Boolean']>;
};

export type Container = {
  __typename?: 'Container';
  col: Scalars['String'];
  createdAt: Scalars['DateTime'];
  currHum: Scalars['String'];
  currTemp: Scalars['String'];
  id: Scalars['ID'];
  isResponding: Scalars['Boolean'];
  lightsAreOn: Scalars['Boolean'];
  snapshots: Array<Snapshot>;
  trays: Array<Tray>;
  updatedAt: Scalars['DateTime'];
};

export type ContainerResponse = {
  __typename?: 'ContainerResponse';
  container?: Maybe<Container>;
  errors?: Maybe<Array<FieldError>>;
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
  dryingTime: Scalars['Int'];
  model: Scalars['String'];
  serialNum: Scalars['String'];
  trayId: Scalars['String'];
  type: Scalars['String'];
};

export type CreateOfficerInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  officerNum: Scalars['String'];
  type: Scalars['String'];
};

export type CreatePatientInput = {
  /** Example field (placeholder) */
  hosNum: Scalars['String'];
};

export type CreateRepairRequestInput = {
  endoId: Scalars['String'];
  note: Scalars['String'];
  officerNum: Scalars['String'];
};

export type CreateSessionInput = {
  endoId: Scalars['String'];
  endoWasExpired: Scalars['Boolean'];
  endoWasOutOfOrder: Scalars['Boolean'];
};

export type CreateSettingInput = {
  name: Scalars['String'];
  value: Scalars['String'];
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

export type CreateUserInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Endo = {
  __typename?: 'Endo';
  brand: Scalars['String'];
  createdAt: Scalars['DateTime'];
  currentSessionId?: Maybe<Scalars['String']>;
  dryingTime: Scalars['Int'];
  endoCrons: Array<EndoCron>;
  id: Scalars['ID'];
  lastPutBackISO: Scalars['String'];
  model: Scalars['String'];
  position: Scalars['String'];
  repairRequests?: Maybe<Array<RepairRequest>>;
  serialNum: Scalars['String'];
  sessions: Array<Session>;
  status: Scalars['String'];
  tray: Tray;
  trayId: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type EndoCron = {
  __typename?: 'EndoCron';
  createdAt: Scalars['DateTime'];
  endo: Endo;
  endoId: Scalars['String'];
  id: Scalars['ID'];
  isoDate: Scalars['String'];
  toBeStatus: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type IPaginationMetaClass = {
  __typename?: 'IPaginationMetaClass';
  currentPage: Scalars['Int'];
  itemCount: Scalars['Int'];
  itemsPerPage: Scalars['Int'];
  totalItems: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  blinkLocation: Scalars['Boolean'];
  createAction: ActionResponse;
  createContainer: Container;
  createEndo: Endo;
  createOfficer: OfficerResponse;
  createPatient: Patient;
  createRepairRequest: RepairRequestResponse;
  createSession: Session;
  createSetting: Setting;
  createSnapshot: Snapshot;
  createTray: Tray;
  deleteAllData: BooleanResponse;
  deleteEndo: BooleanResponse;
  deleteOfficer: BooleanResponse;
  finishRepair: Endo;
  login: UserResponse;
  logout: Scalars['Boolean'];
  pickEndo: Endo;
  populateAllData: BooleanResponse;
  register: UserResponse;
  removeAction: Action;
  removeContainer: Container;
  removePatient: Patient;
  removeRepairRequest: BooleanResponse;
  removeSession: Session;
  removeTray: Tray;
  removeUser: User;
  turnLightsOff: ContainerResponse;
  turnLightsOn: ContainerResponse;
  updateDryingTime: Endo;
  updateEndo: Endo;
  updateOfficer: OfficerResponse;
  updateRepairRequest: RepairRequestResponse;
  updateSession: Session;
  updateSessionPatient: Session;
  updateSetting: Setting;
  updateTray: Tray;
  updateUser: User;
  washWithoutStoring: Session;
};


export type MutationBlinkLocationArgs = {
  input: RowAndColInput;
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
  input: CreateOfficerInput;
};


export type MutationCreatePatientArgs = {
  createPatientInput: CreatePatientInput;
};


export type MutationCreateRepairRequestArgs = {
  input: CreateRepairRequestInput;
};


export type MutationCreateSessionArgs = {
  input: CreateSessionInput;
};


export type MutationCreateSettingArgs = {
  input: CreateSettingInput;
};


export type MutationCreateSnapshotArgs = {
  input: CreateSnapshotInput;
};


export type MutationCreateTrayArgs = {
  input: CreateTrayInput;
};


export type MutationDeleteEndoArgs = {
  id: Scalars['String'];
};


export type MutationDeleteOfficerArgs = {
  id: Scalars['String'];
};


export type MutationFinishRepairArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationPickEndoArgs = {
  id: Scalars['String'];
};


export type MutationRegisterArgs = {
  input: CreateUserInput;
};


export type MutationRemoveActionArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveContainerArgs = {
  id: Scalars['Int'];
};


export type MutationRemovePatientArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveRepairRequestArgs = {
  id: Scalars['String'];
};


export type MutationRemoveSessionArgs = {
  id: Scalars['String'];
};


export type MutationRemoveTrayArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['Int'];
};


export type MutationTurnLightsOffArgs = {
  id: Scalars['String'];
};


export type MutationTurnLightsOnArgs = {
  id: Scalars['String'];
};


export type MutationUpdateDryingTimeArgs = {
  input: UpdateDryingTimeInput;
};


export type MutationUpdateEndoArgs = {
  id: Scalars['String'];
  input: UpdateEndoInput;
};


export type MutationUpdateOfficerArgs = {
  input: UpdateOfficerInput;
};


export type MutationUpdateRepairRequestArgs = {
  input: UpdateRepairRequestInput;
};


export type MutationUpdateSessionArgs = {
  updateSessionInput: UpdateSessionInput;
};


export type MutationUpdateSessionPatientArgs = {
  input: UpdateSessionPatientInput;
};


export type MutationUpdateSettingArgs = {
  input: UpdateSettingInput;
};


export type MutationUpdateTrayArgs = {
  updateTrayInput: UpdateTrayInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};


export type MutationWashWithoutStoringArgs = {
  id: Scalars['String'];
};

export type Officer = {
  __typename?: 'Officer';
  actions: Array<Action>;
  createdAt: Scalars['DateTime'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  officerNum: Scalars['String'];
  repairRequests: Array<RepairRequest>;
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type OfficerResponse = {
  __typename?: 'OfficerResponse';
  errors?: Maybe<Array<FieldError>>;
  officer?: Maybe<Officer>;
};

export type PaginatedActionOutput = {
  __typename?: 'PaginatedActionOutput';
  items: Array<Action>;
  meta: IPaginationMetaClass;
};

export type PaginatedInput = {
  limit?: Scalars['Int'];
  page?: Scalars['Int'];
};

export type PaginatedSnapshotOutput = {
  __typename?: 'PaginatedSnapshotOutput';
  items: Array<Snapshot>;
  meta: IPaginationMetaClass;
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
  actions: Array<Action>;
  container: Container;
  containers: Array<Container>;
  emptyTrays: Array<Tray>;
  endo: Endo;
  endoCronsInDb: Array<EndoCron>;
  endoCronsInMemory: Array<Scalars['String']>;
  endos: Array<Endo>;
  me?: Maybe<User>;
  officer: Officer;
  officers: Array<Officer>;
  paginatedActions: PaginatedActionOutput;
  paginatedSnapshots: PaginatedSnapshotOutput;
  patient: Patient;
  patients: Array<Patient>;
  repairRequest: RepairRequest;
  repairRequests: Array<RepairRequest>;
  repairRequestsByEndo: Array<RepairRequest>;
  session: Session;
  sessions: Array<Session>;
  setting: Setting;
  settings: Array<Setting>;
  snapshotIntervalMins: Setting;
  snapshots: Array<Snapshot>;
  tray: Tray;
  trays: Array<Tray>;
  user: User;
  users: Array<User>;
};


export type QueryContainerArgs = {
  id: Scalars['String'];
};


export type QueryEndoArgs = {
  id: Scalars['String'];
};


export type QueryOfficerArgs = {
  id: Scalars['String'];
};


export type QueryPaginatedActionsArgs = {
  input: PaginatedInput;
};


export type QueryPaginatedSnapshotsArgs = {
  input: PaginatedInput;
};


export type QueryPatientArgs = {
  id: Scalars['String'];
};


export type QueryRepairRequestArgs = {
  id: Scalars['String'];
};


export type QueryRepairRequestsByEndoArgs = {
  endoId: Scalars['String'];
};


export type QuerySessionArgs = {
  id: Scalars['String'];
};


export type QuerySettingArgs = {
  id: Scalars['Int'];
};


export type QueryTrayArgs = {
  id: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

export type RepairRequest = {
  __typename?: 'RepairRequest';
  createdAt: Scalars['DateTime'];
  endo: Endo;
  endoId: Scalars['String'];
  id: Scalars['ID'];
  note: Scalars['String'];
  officer: Officer;
  officerId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type RepairRequestResponse = {
  __typename?: 'RepairRequestResponse';
  errors?: Maybe<Array<FieldError>>;
  repairRequest?: Maybe<RepairRequest>;
};

export type RowAndColInput = {
  col: Scalars['String'];
  row: Scalars['Int'];
  status: Scalars['String'];
};

export type Session = {
  __typename?: 'Session';
  actions?: Maybe<Array<Action>>;
  createdAt: Scalars['DateTime'];
  endo: Endo;
  endoId: Scalars['String'];
  endoWasExpired: Scalars['Boolean'];
  endoWasOutOfOrder: Scalars['Boolean'];
  id: Scalars['ID'];
  isoEndTime?: Maybe<Scalars['String']>;
  patient?: Maybe<Patient>;
  patientId?: Maybe<Scalars['String']>;
  status: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Setting = {
  __typename?: 'Setting';
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  label: Scalars['String'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  value: Scalars['String'];
};

export type Snapshot = {
  __typename?: 'Snapshot';
  container: Container;
  containerId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  hum: Scalars['String'];
  id: Scalars['ID'];
  systemStatus: Scalars['String'];
  temp: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Subscription = {
  __typename?: 'Subscription';
  subscribeToOverHumOrTemp: Snapshot;
};


export type SubscriptionSubscribeToOverHumOrTempArgs = {
  humThreshold: Scalars['String'];
  tempThreshold: Scalars['String'];
};

export type Tray = {
  __typename?: 'Tray';
  container: Container;
  containerId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  endo?: Maybe<Endo>;
  id: Scalars['ID'];
  position: Scalars['String'];
  row: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type UpdateDryingTimeInput = {
  endoId: Scalars['String'];
  mins: Scalars['Int'];
};

export type UpdateEndoInput = {
  brand: Scalars['String'];
  dryingTime: Scalars['Int'];
  model: Scalars['String'];
  serialNum: Scalars['String'];
  trayId: Scalars['String'];
  type: Scalars['String'];
};

export type UpdateOfficerInput = {
  firstName?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  lastName?: InputMaybe<Scalars['String']>;
  officerNum?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type UpdateRepairRequestInput = {
  endoId?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
  officerNum?: InputMaybe<Scalars['String']>;
};

export type UpdateSessionInput = {
  endTime?: InputMaybe<Scalars['String']>;
  endoId?: InputMaybe<Scalars['String']>;
  endoWasExpired?: InputMaybe<Scalars['Boolean']>;
  endoWasOutOfOrder?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['String']>;
  patientHN?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
};

export type UpdateSessionPatientInput = {
  id?: InputMaybe<Scalars['String']>;
  patientHN: Scalars['String'];
};

export type UpdateSettingInput = {
  name: Scalars['String'];
  value: Scalars['String'];
};

export type UpdateTrayInput = {
  containerId?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  /** row inside a container */
  row?: InputMaybe<Scalars['Int']>;
};

export type UpdateUserInput = {
  id: Scalars['Int'];
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type ActionsQueryVariables = Exact<{ [key: string]: never; }>;


export type ActionsQuery = { __typename?: 'Query', actions: Array<{ __typename?: 'Action', id: string, passed: boolean, type: string, createdAt: any, officerId: string, officer: { __typename?: 'Officer', officerNum: string }, session: { __typename?: 'Session', id: string, status: string, endoId: string, patientId?: string | null, endo: { __typename?: 'Endo', brand: string, type: string, model: string, serialNum: string, position: string }, patient?: { __typename?: 'Patient', hosNum: string } | null } }> };

export type PaginatedActionsQueryVariables = Exact<{
  input: PaginatedInput;
}>;


export type PaginatedActionsQuery = { __typename?: 'Query', paginatedActions: { __typename?: 'PaginatedActionOutput', meta: { __typename?: 'IPaginationMetaClass', totalItems: number, totalPages: number, itemCount: number, itemsPerPage: number, currentPage: number }, items: Array<{ __typename?: 'Action', id: string, passed: boolean, type: string, createdAt: any, officerId: string, sessionId: string, officer: { __typename?: 'Officer', officerNum: string }, session: { __typename?: 'Session', id: string, status: string, endoId: string, patientId?: string | null, endo: { __typename?: 'Endo', brand: string, type: string, model: string, position: string, serialNum: string }, patient?: { __typename?: 'Patient', hosNum: string } | null } }> } };

export type DeleteAllDataMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteAllDataMutation = { __typename?: 'Mutation', deleteAllData: { __typename?: 'BooleanResponse', value?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type PopulateAllDataMutationVariables = Exact<{ [key: string]: never; }>;


export type PopulateAllDataMutation = { __typename?: 'Mutation', populateAllData: { __typename?: 'BooleanResponse', value?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: string, username: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, username: string } | null };

export type TurnLightsOffMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type TurnLightsOffMutation = { __typename?: 'Mutation', turnLightsOff: { __typename?: 'ContainerResponse', container?: { __typename?: 'Container', id: string, col: string, currTemp: string, currHum: string, lightsAreOn: boolean } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type TurnLightsOnMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type TurnLightsOnMutation = { __typename?: 'Mutation', turnLightsOn: { __typename?: 'ContainerResponse', container?: { __typename?: 'Container', id: string, col: string, currTemp: string, currHum: string, lightsAreOn: boolean } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type ContainersQueryVariables = Exact<{ [key: string]: never; }>;


export type ContainersQuery = { __typename?: 'Query', containers: Array<{ __typename?: 'Container', id: string, col: string, currTemp: string, currHum: string, isResponding: boolean, lightsAreOn: boolean }> };

export type CreateEndoMutationVariables = Exact<{
  input: CreateEndoInput;
}>;


export type CreateEndoMutation = { __typename?: 'Mutation', createEndo: { __typename?: 'Endo', id: string, trayId: string, brand: string, serialNum: string, dryingTime: number, type: string, model: string } };

export type DeleteEndoMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteEndoMutation = { __typename?: 'Mutation', deleteEndo: { __typename?: 'BooleanResponse', value?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type PickEndoMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type PickEndoMutation = { __typename?: 'Mutation', pickEndo: { __typename?: 'Endo', id: string, trayId: string, brand: string, type: string, model: string, status: string, currentSessionId?: string | null } };

export type UpdateDryingTimeMutationVariables = Exact<{
  input: UpdateDryingTimeInput;
}>;


export type UpdateDryingTimeMutation = { __typename?: 'Mutation', updateDryingTime: { __typename?: 'Endo', id: string, dryingTime: number } };

export type UpdateEndoMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateEndoInput;
}>;


export type UpdateEndoMutation = { __typename?: 'Mutation', updateEndo: { __typename?: 'Endo', id: string, trayId: string, serialNum: string, dryingTime: number, brand: string, type: string, model: string } };

export type WashWithoutStoringMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type WashWithoutStoringMutation = { __typename?: 'Mutation', washWithoutStoring: { __typename?: 'Session', id: string } };

export type EndoQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type EndoQuery = { __typename?: 'Query', endo: { __typename?: 'Endo', id: string, serialNum: string, dryingTime: number, status: string, brand: string, type: string, model: string, lastPutBackISO: string, position: string, trayId: string, tray: { __typename?: 'Tray', id: string, row: number, position: string, container: { __typename?: 'Container', id: string, col: string } } } };

export type EndosQueryVariables = Exact<{ [key: string]: never; }>;


export type EndosQuery = { __typename?: 'Query', endos: Array<{ __typename?: 'Endo', id: string, trayId: string, brand: string, type: string, model: string, status: string, currentSessionId?: string | null, serialNum: string, lastPutBackISO: string, dryingTime: number, position: string, repairRequests?: Array<{ __typename?: 'RepairRequest', id: string }> | null, tray: { __typename?: 'Tray', id: string, row: number, container: { __typename?: 'Container', id: string, col: string, isResponding: boolean } } }> };

export type FinishRepairMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type FinishRepairMutation = { __typename?: 'Mutation', finishRepair: { __typename?: 'Endo', id: string } };

export type CreateOfficerMutationVariables = Exact<{
  input: CreateOfficerInput;
}>;


export type CreateOfficerMutation = { __typename?: 'Mutation', createOfficer: { __typename?: 'OfficerResponse', officer?: { __typename?: 'Officer', id: string, officerNum: string, firstName: string, lastName: string, type: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeleteOfficerMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteOfficerMutation = { __typename?: 'Mutation', deleteOfficer: { __typename?: 'BooleanResponse', value?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateOfficerMutationVariables = Exact<{
  input: UpdateOfficerInput;
}>;


export type UpdateOfficerMutation = { __typename?: 'Mutation', updateOfficer: { __typename?: 'OfficerResponse', officer?: { __typename?: 'Officer', id: string, officerNum: string, firstName: string, lastName: string, type: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type OfficerQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type OfficerQuery = { __typename?: 'Query', officer: { __typename?: 'Officer', id: string, officerNum: string, firstName: string, lastName: string, type: string } };

export type OfficersQueryVariables = Exact<{ [key: string]: never; }>;


export type OfficersQuery = { __typename?: 'Query', officers: Array<{ __typename?: 'Officer', id: string, officerNum: string, firstName: string, lastName: string, type: string }> };

export type CreateRepairRequestMutationVariables = Exact<{
  input: CreateRepairRequestInput;
}>;


export type CreateRepairRequestMutation = { __typename?: 'Mutation', createRepairRequest: { __typename?: 'RepairRequestResponse', repairRequest?: { __typename?: 'RepairRequest', id: string, note: string, officerId: string, endoId: string, officer: { __typename?: 'Officer', id: string }, endo: { __typename?: 'Endo', id: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type RemoveRepairRequestMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type RemoveRepairRequestMutation = { __typename?: 'Mutation', removeRepairRequest: { __typename?: 'BooleanResponse', value?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type RepairRequestQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type RepairRequestQuery = { __typename?: 'Query', repairRequest: { __typename?: 'RepairRequest', id: string, note: string, officerId: string, endoId: string, officer: { __typename?: 'Officer', id: string }, endo: { __typename?: 'Endo', id: string } } };

export type RepairRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type RepairRequestsQuery = { __typename?: 'Query', repairRequests: Array<{ __typename?: 'RepairRequest', id: string, note: string, officerId: string, endoId: string, createdAt: any, officer: { __typename?: 'Officer', id: string }, endo: { __typename?: 'Endo', id: string } }> };

export type RepairRequestsByEndoQueryVariables = Exact<{
  endoId: Scalars['String'];
}>;


export type RepairRequestsByEndoQuery = { __typename?: 'Query', repairRequestsByEndo: Array<{ __typename?: 'RepairRequest', id: string, note: string, officerId: string, endoId: string, createdAt: any, officer: { __typename?: 'Officer', id: string, officerNum: string, firstName: string, lastName: string }, endo: { __typename?: 'Endo', id: string, serialNum: string, dryingTime: number, status: string, brand: string, type: string, model: string, lastPutBackISO: string, position: string } }> };

export type UpdateRepairRequestMutationVariables = Exact<{
  input: UpdateRepairRequestInput;
}>;


export type UpdateRepairRequestMutation = { __typename?: 'Mutation', updateRepairRequest: { __typename?: 'RepairRequestResponse', repairRequest?: { __typename?: 'RepairRequest', id: string, note: string, officerId: string, endoId: string, officer: { __typename?: 'Officer', id: string }, endo: { __typename?: 'Endo', id: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type BlinkLocationMutationVariables = Exact<{
  input: RowAndColInput;
}>;


export type BlinkLocationMutation = { __typename?: 'Mutation', blinkLocation: boolean };

export type CreateActionMutationVariables = Exact<{
  input: CreateActionInput;
}>;


export type CreateActionMutation = { __typename?: 'Mutation', createAction: { __typename?: 'ActionResponse', action?: { __typename?: 'Action', id: string, type: string, passed: boolean, sessionId: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateSessionPatientMutationVariables = Exact<{
  input: UpdateSessionPatientInput;
}>;


export type UpdateSessionPatientMutation = { __typename?: 'Mutation', updateSessionPatient: { __typename?: 'Session', id: string, endoId: string, status: string, patientId?: string | null } };

export type SessionQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type SessionQuery = { __typename?: 'Query', session: { __typename?: 'Session', id: string, endoId: string, status: string, endoWasExpired: boolean, endoWasOutOfOrder: boolean, patientId?: string | null, endo: { __typename?: 'Endo', id: string, status: string }, patient?: { __typename?: 'Patient', id: string, hosNum: string } | null, actions?: Array<{ __typename?: 'Action', id: string, passed: boolean, type: string, createdAt: any, officerId: string, officer: { __typename?: 'Officer', id: string, officerNum: string } }> | null } };

export type UpdateSettingMutationVariables = Exact<{
  input: UpdateSettingInput;
}>;


export type UpdateSettingMutation = { __typename?: 'Mutation', updateSetting: { __typename?: 'Setting', id: string, name: string, value: string } };

export type SettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingsQuery = { __typename?: 'Query', settings: Array<{ __typename?: 'Setting', id: string, name: string, label: string, description: string, value: string }> };

export type SnapshotIntervalMinsQueryVariables = Exact<{ [key: string]: never; }>;


export type SnapshotIntervalMinsQuery = { __typename?: 'Query', snapshotIntervalMins: { __typename?: 'Setting', id: string, name: string, value: string, label: string, description: string } };

export type PaginatedSnapshotsQueryVariables = Exact<{
  input: PaginatedInput;
}>;


export type PaginatedSnapshotsQuery = { __typename?: 'Query', paginatedSnapshots: { __typename?: 'PaginatedSnapshotOutput', meta: { __typename?: 'IPaginationMetaClass', totalItems: number, totalPages: number, itemCount: number, itemsPerPage: number, currentPage: number }, items: Array<{ __typename?: 'Snapshot', id: string, hum: string, temp: string, systemStatus: string, containerId: string, createdAt: any, container: { __typename?: 'Container', id: string, col: string } }> } };

export type SnapshotsQueryVariables = Exact<{ [key: string]: never; }>;


export type SnapshotsQuery = { __typename?: 'Query', snapshots: Array<{ __typename?: 'Snapshot', id: string, hum: string, temp: string, systemStatus: string, createdAt: any, containerId: string, container: { __typename?: 'Container', id: string, col: string } }> };

export type SubscribeToOverHumOrTempSubscriptionVariables = Exact<{
  humThreshold: Scalars['String'];
  tempThreshold: Scalars['String'];
}>;


export type SubscribeToOverHumOrTempSubscription = { __typename?: 'Subscription', subscribeToOverHumOrTemp: { __typename?: 'Snapshot', id: string, hum: string, temp: string, container: { __typename?: 'Container', id: string, col: string } } };

export type EmptyTraysQueryVariables = Exact<{ [key: string]: never; }>;


export type EmptyTraysQuery = { __typename?: 'Query', emptyTrays: Array<{ __typename?: 'Tray', id: string, position: string, row: number, container: { __typename?: 'Container', id: string } }> };


export const ActionsDocument = gql`
    query Actions {
  actions {
    id
    passed
    type
    createdAt
    officerId
    officer {
      officerNum
    }
    session {
      id
      status
      endoId
      endo {
        brand
        type
        model
        serialNum
        position
      }
      patientId
      patient {
        hosNum
      }
    }
  }
}
    `;

/**
 * __useActionsQuery__
 *
 * To run a query within a React component, call `useActionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useActionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useActionsQuery(baseOptions?: Apollo.QueryHookOptions<ActionsQuery, ActionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ActionsQuery, ActionsQueryVariables>(ActionsDocument, options);
      }
export function useActionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ActionsQuery, ActionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ActionsQuery, ActionsQueryVariables>(ActionsDocument, options);
        }
export type ActionsQueryHookResult = ReturnType<typeof useActionsQuery>;
export type ActionsLazyQueryHookResult = ReturnType<typeof useActionsLazyQuery>;
export type ActionsQueryResult = Apollo.QueryResult<ActionsQuery, ActionsQueryVariables>;
export const PaginatedActionsDocument = gql`
    query PaginatedActions($input: PaginatedInput!) {
  paginatedActions(input: $input) {
    meta {
      totalItems
      totalPages
      itemCount
      itemsPerPage
      currentPage
    }
    items {
      id
      passed
      type
      createdAt
      officerId
      officer {
        officerNum
      }
      sessionId
      session {
        id
        status
        endoId
        endo {
          brand
          type
          model
          position
          serialNum
        }
        patientId
        patient {
          hosNum
        }
      }
    }
  }
}
    `;

/**
 * __usePaginatedActionsQuery__
 *
 * To run a query within a React component, call `usePaginatedActionsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaginatedActionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaginatedActionsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePaginatedActionsQuery(baseOptions: Apollo.QueryHookOptions<PaginatedActionsQuery, PaginatedActionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaginatedActionsQuery, PaginatedActionsQueryVariables>(PaginatedActionsDocument, options);
      }
export function usePaginatedActionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaginatedActionsQuery, PaginatedActionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaginatedActionsQuery, PaginatedActionsQueryVariables>(PaginatedActionsDocument, options);
        }
export type PaginatedActionsQueryHookResult = ReturnType<typeof usePaginatedActionsQuery>;
export type PaginatedActionsLazyQueryHookResult = ReturnType<typeof usePaginatedActionsLazyQuery>;
export type PaginatedActionsQueryResult = Apollo.QueryResult<PaginatedActionsQuery, PaginatedActionsQueryVariables>;
export const DeleteAllDataDocument = gql`
    mutation DeleteAllData {
  deleteAllData {
    value
    errors {
      field
      message
    }
  }
}
    `;
export type DeleteAllDataMutationFn = Apollo.MutationFunction<DeleteAllDataMutation, DeleteAllDataMutationVariables>;

/**
 * __useDeleteAllDataMutation__
 *
 * To run a mutation, you first call `useDeleteAllDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAllDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAllDataMutation, { data, loading, error }] = useDeleteAllDataMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteAllDataMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAllDataMutation, DeleteAllDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAllDataMutation, DeleteAllDataMutationVariables>(DeleteAllDataDocument, options);
      }
export type DeleteAllDataMutationHookResult = ReturnType<typeof useDeleteAllDataMutation>;
export type DeleteAllDataMutationResult = Apollo.MutationResult<DeleteAllDataMutation>;
export type DeleteAllDataMutationOptions = Apollo.BaseMutationOptions<DeleteAllDataMutation, DeleteAllDataMutationVariables>;
export const PopulateAllDataDocument = gql`
    mutation PopulateAllData {
  populateAllData {
    value
    errors {
      field
      message
    }
  }
}
    `;
export type PopulateAllDataMutationFn = Apollo.MutationFunction<PopulateAllDataMutation, PopulateAllDataMutationVariables>;

/**
 * __usePopulateAllDataMutation__
 *
 * To run a mutation, you first call `usePopulateAllDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePopulateAllDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [populateAllDataMutation, { data, loading, error }] = usePopulateAllDataMutation({
 *   variables: {
 *   },
 * });
 */
export function usePopulateAllDataMutation(baseOptions?: Apollo.MutationHookOptions<PopulateAllDataMutation, PopulateAllDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PopulateAllDataMutation, PopulateAllDataMutationVariables>(PopulateAllDataDocument, options);
      }
export type PopulateAllDataMutationHookResult = ReturnType<typeof usePopulateAllDataMutation>;
export type PopulateAllDataMutationResult = Apollo.MutationResult<PopulateAllDataMutation>;
export type PopulateAllDataMutationOptions = Apollo.BaseMutationOptions<PopulateAllDataMutation, PopulateAllDataMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    errors {
      field
      message
    }
    user {
      id
      username
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const TurnLightsOffDocument = gql`
    mutation TurnLightsOff($id: String!) {
  turnLightsOff(id: $id) {
    container {
      id
      col
      currTemp
      currHum
      lightsAreOn
    }
    errors {
      field
      message
    }
  }
}
    `;
export type TurnLightsOffMutationFn = Apollo.MutationFunction<TurnLightsOffMutation, TurnLightsOffMutationVariables>;

/**
 * __useTurnLightsOffMutation__
 *
 * To run a mutation, you first call `useTurnLightsOffMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTurnLightsOffMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [turnLightsOffMutation, { data, loading, error }] = useTurnLightsOffMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTurnLightsOffMutation(baseOptions?: Apollo.MutationHookOptions<TurnLightsOffMutation, TurnLightsOffMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TurnLightsOffMutation, TurnLightsOffMutationVariables>(TurnLightsOffDocument, options);
      }
export type TurnLightsOffMutationHookResult = ReturnType<typeof useTurnLightsOffMutation>;
export type TurnLightsOffMutationResult = Apollo.MutationResult<TurnLightsOffMutation>;
export type TurnLightsOffMutationOptions = Apollo.BaseMutationOptions<TurnLightsOffMutation, TurnLightsOffMutationVariables>;
export const TurnLightsOnDocument = gql`
    mutation TurnLightsOn($id: String!) {
  turnLightsOn(id: $id) {
    container {
      id
      col
      currTemp
      currHum
      lightsAreOn
    }
    errors {
      field
      message
    }
  }
}
    `;
export type TurnLightsOnMutationFn = Apollo.MutationFunction<TurnLightsOnMutation, TurnLightsOnMutationVariables>;

/**
 * __useTurnLightsOnMutation__
 *
 * To run a mutation, you first call `useTurnLightsOnMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTurnLightsOnMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [turnLightsOnMutation, { data, loading, error }] = useTurnLightsOnMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTurnLightsOnMutation(baseOptions?: Apollo.MutationHookOptions<TurnLightsOnMutation, TurnLightsOnMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TurnLightsOnMutation, TurnLightsOnMutationVariables>(TurnLightsOnDocument, options);
      }
export type TurnLightsOnMutationHookResult = ReturnType<typeof useTurnLightsOnMutation>;
export type TurnLightsOnMutationResult = Apollo.MutationResult<TurnLightsOnMutation>;
export type TurnLightsOnMutationOptions = Apollo.BaseMutationOptions<TurnLightsOnMutation, TurnLightsOnMutationVariables>;
export const ContainersDocument = gql`
    query Containers {
  containers {
    id
    col
    currTemp
    currHum
    isResponding
    lightsAreOn
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
export const CreateEndoDocument = gql`
    mutation createEndo($input: CreateEndoInput!) {
  createEndo(input: $input) {
    id
    trayId
    brand
    serialNum
    dryingTime
    type
    model
  }
}
    `;
export type CreateEndoMutationFn = Apollo.MutationFunction<CreateEndoMutation, CreateEndoMutationVariables>;

/**
 * __useCreateEndoMutation__
 *
 * To run a mutation, you first call `useCreateEndoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEndoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEndoMutation, { data, loading, error }] = useCreateEndoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEndoMutation(baseOptions?: Apollo.MutationHookOptions<CreateEndoMutation, CreateEndoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEndoMutation, CreateEndoMutationVariables>(CreateEndoDocument, options);
      }
export type CreateEndoMutationHookResult = ReturnType<typeof useCreateEndoMutation>;
export type CreateEndoMutationResult = Apollo.MutationResult<CreateEndoMutation>;
export type CreateEndoMutationOptions = Apollo.BaseMutationOptions<CreateEndoMutation, CreateEndoMutationVariables>;
export const DeleteEndoDocument = gql`
    mutation DeleteEndo($id: String!) {
  deleteEndo(id: $id) {
    value
    errors {
      field
      message
    }
  }
}
    `;
export type DeleteEndoMutationFn = Apollo.MutationFunction<DeleteEndoMutation, DeleteEndoMutationVariables>;

/**
 * __useDeleteEndoMutation__
 *
 * To run a mutation, you first call `useDeleteEndoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEndoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEndoMutation, { data, loading, error }] = useDeleteEndoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteEndoMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEndoMutation, DeleteEndoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEndoMutation, DeleteEndoMutationVariables>(DeleteEndoDocument, options);
      }
export type DeleteEndoMutationHookResult = ReturnType<typeof useDeleteEndoMutation>;
export type DeleteEndoMutationResult = Apollo.MutationResult<DeleteEndoMutation>;
export type DeleteEndoMutationOptions = Apollo.BaseMutationOptions<DeleteEndoMutation, DeleteEndoMutationVariables>;
export const PickEndoDocument = gql`
    mutation pickEndo($id: String!) {
  pickEndo(id: $id) {
    id
    trayId
    brand
    type
    model
    status
    currentSessionId
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
export const UpdateDryingTimeDocument = gql`
    mutation updateDryingTime($input: UpdateDryingTimeInput!) {
  updateDryingTime(input: $input) {
    id
    dryingTime
  }
}
    `;
export type UpdateDryingTimeMutationFn = Apollo.MutationFunction<UpdateDryingTimeMutation, UpdateDryingTimeMutationVariables>;

/**
 * __useUpdateDryingTimeMutation__
 *
 * To run a mutation, you first call `useUpdateDryingTimeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDryingTimeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDryingTimeMutation, { data, loading, error }] = useUpdateDryingTimeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDryingTimeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDryingTimeMutation, UpdateDryingTimeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDryingTimeMutation, UpdateDryingTimeMutationVariables>(UpdateDryingTimeDocument, options);
      }
export type UpdateDryingTimeMutationHookResult = ReturnType<typeof useUpdateDryingTimeMutation>;
export type UpdateDryingTimeMutationResult = Apollo.MutationResult<UpdateDryingTimeMutation>;
export type UpdateDryingTimeMutationOptions = Apollo.BaseMutationOptions<UpdateDryingTimeMutation, UpdateDryingTimeMutationVariables>;
export const UpdateEndoDocument = gql`
    mutation updateEndo($id: String!, $input: UpdateEndoInput!) {
  updateEndo(id: $id, input: $input) {
    id
    trayId
    serialNum
    dryingTime
    brand
    type
    model
  }
}
    `;
export type UpdateEndoMutationFn = Apollo.MutationFunction<UpdateEndoMutation, UpdateEndoMutationVariables>;

/**
 * __useUpdateEndoMutation__
 *
 * To run a mutation, you first call `useUpdateEndoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEndoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEndoMutation, { data, loading, error }] = useUpdateEndoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateEndoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEndoMutation, UpdateEndoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEndoMutation, UpdateEndoMutationVariables>(UpdateEndoDocument, options);
      }
export type UpdateEndoMutationHookResult = ReturnType<typeof useUpdateEndoMutation>;
export type UpdateEndoMutationResult = Apollo.MutationResult<UpdateEndoMutation>;
export type UpdateEndoMutationOptions = Apollo.BaseMutationOptions<UpdateEndoMutation, UpdateEndoMutationVariables>;
export const WashWithoutStoringDocument = gql`
    mutation WashWithoutStoring($id: String!) {
  washWithoutStoring(id: $id) {
    id
  }
}
    `;
export type WashWithoutStoringMutationFn = Apollo.MutationFunction<WashWithoutStoringMutation, WashWithoutStoringMutationVariables>;

/**
 * __useWashWithoutStoringMutation__
 *
 * To run a mutation, you first call `useWashWithoutStoringMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useWashWithoutStoringMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [washWithoutStoringMutation, { data, loading, error }] = useWashWithoutStoringMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useWashWithoutStoringMutation(baseOptions?: Apollo.MutationHookOptions<WashWithoutStoringMutation, WashWithoutStoringMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<WashWithoutStoringMutation, WashWithoutStoringMutationVariables>(WashWithoutStoringDocument, options);
      }
export type WashWithoutStoringMutationHookResult = ReturnType<typeof useWashWithoutStoringMutation>;
export type WashWithoutStoringMutationResult = Apollo.MutationResult<WashWithoutStoringMutation>;
export type WashWithoutStoringMutationOptions = Apollo.BaseMutationOptions<WashWithoutStoringMutation, WashWithoutStoringMutationVariables>;
export const EndoDocument = gql`
    query Endo($id: String!) {
  endo(id: $id) {
    id
    serialNum
    dryingTime
    status
    brand
    type
    model
    lastPutBackISO
    position
    trayId
    tray {
      id
      row
      position
      container {
        id
        col
      }
    }
  }
}
    `;

/**
 * __useEndoQuery__
 *
 * To run a query within a React component, call `useEndoQuery` and pass it any options that fit your needs.
 * When your component renders, `useEndoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEndoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEndoQuery(baseOptions: Apollo.QueryHookOptions<EndoQuery, EndoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EndoQuery, EndoQueryVariables>(EndoDocument, options);
      }
export function useEndoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EndoQuery, EndoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EndoQuery, EndoQueryVariables>(EndoDocument, options);
        }
export type EndoQueryHookResult = ReturnType<typeof useEndoQuery>;
export type EndoLazyQueryHookResult = ReturnType<typeof useEndoLazyQuery>;
export type EndoQueryResult = Apollo.QueryResult<EndoQuery, EndoQueryVariables>;
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
    serialNum
    lastPutBackISO
    dryingTime
    position
    repairRequests {
      id
    }
    tray {
      id
      row
      container {
        id
        col
        isResponding
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
export const FinishRepairDocument = gql`
    mutation FinishRepair($id: String!) {
  finishRepair(id: $id) {
    id
  }
}
    `;
export type FinishRepairMutationFn = Apollo.MutationFunction<FinishRepairMutation, FinishRepairMutationVariables>;

/**
 * __useFinishRepairMutation__
 *
 * To run a mutation, you first call `useFinishRepairMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFinishRepairMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [finishRepairMutation, { data, loading, error }] = useFinishRepairMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFinishRepairMutation(baseOptions?: Apollo.MutationHookOptions<FinishRepairMutation, FinishRepairMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FinishRepairMutation, FinishRepairMutationVariables>(FinishRepairDocument, options);
      }
export type FinishRepairMutationHookResult = ReturnType<typeof useFinishRepairMutation>;
export type FinishRepairMutationResult = Apollo.MutationResult<FinishRepairMutation>;
export type FinishRepairMutationOptions = Apollo.BaseMutationOptions<FinishRepairMutation, FinishRepairMutationVariables>;
export const CreateOfficerDocument = gql`
    mutation CreateOfficer($input: CreateOfficerInput!) {
  createOfficer(input: $input) {
    officer {
      id
      officerNum
      firstName
      lastName
      type
    }
    errors {
      field
      message
    }
  }
}
    `;
export type CreateOfficerMutationFn = Apollo.MutationFunction<CreateOfficerMutation, CreateOfficerMutationVariables>;

/**
 * __useCreateOfficerMutation__
 *
 * To run a mutation, you first call `useCreateOfficerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOfficerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOfficerMutation, { data, loading, error }] = useCreateOfficerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOfficerMutation(baseOptions?: Apollo.MutationHookOptions<CreateOfficerMutation, CreateOfficerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOfficerMutation, CreateOfficerMutationVariables>(CreateOfficerDocument, options);
      }
export type CreateOfficerMutationHookResult = ReturnType<typeof useCreateOfficerMutation>;
export type CreateOfficerMutationResult = Apollo.MutationResult<CreateOfficerMutation>;
export type CreateOfficerMutationOptions = Apollo.BaseMutationOptions<CreateOfficerMutation, CreateOfficerMutationVariables>;
export const DeleteOfficerDocument = gql`
    mutation DeleteOfficer($id: String!) {
  deleteOfficer(id: $id) {
    value
    errors {
      field
      message
    }
  }
}
    `;
export type DeleteOfficerMutationFn = Apollo.MutationFunction<DeleteOfficerMutation, DeleteOfficerMutationVariables>;

/**
 * __useDeleteOfficerMutation__
 *
 * To run a mutation, you first call `useDeleteOfficerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOfficerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOfficerMutation, { data, loading, error }] = useDeleteOfficerMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteOfficerMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOfficerMutation, DeleteOfficerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteOfficerMutation, DeleteOfficerMutationVariables>(DeleteOfficerDocument, options);
      }
export type DeleteOfficerMutationHookResult = ReturnType<typeof useDeleteOfficerMutation>;
export type DeleteOfficerMutationResult = Apollo.MutationResult<DeleteOfficerMutation>;
export type DeleteOfficerMutationOptions = Apollo.BaseMutationOptions<DeleteOfficerMutation, DeleteOfficerMutationVariables>;
export const UpdateOfficerDocument = gql`
    mutation UpdateOfficer($input: UpdateOfficerInput!) {
  updateOfficer(input: $input) {
    officer {
      id
      officerNum
      firstName
      lastName
      type
    }
    errors {
      field
      message
    }
  }
}
    `;
export type UpdateOfficerMutationFn = Apollo.MutationFunction<UpdateOfficerMutation, UpdateOfficerMutationVariables>;

/**
 * __useUpdateOfficerMutation__
 *
 * To run a mutation, you first call `useUpdateOfficerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOfficerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOfficerMutation, { data, loading, error }] = useUpdateOfficerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateOfficerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOfficerMutation, UpdateOfficerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOfficerMutation, UpdateOfficerMutationVariables>(UpdateOfficerDocument, options);
      }
export type UpdateOfficerMutationHookResult = ReturnType<typeof useUpdateOfficerMutation>;
export type UpdateOfficerMutationResult = Apollo.MutationResult<UpdateOfficerMutation>;
export type UpdateOfficerMutationOptions = Apollo.BaseMutationOptions<UpdateOfficerMutation, UpdateOfficerMutationVariables>;
export const OfficerDocument = gql`
    query Officer($id: String!) {
  officer(id: $id) {
    id
    officerNum
    firstName
    lastName
    type
  }
}
    `;

/**
 * __useOfficerQuery__
 *
 * To run a query within a React component, call `useOfficerQuery` and pass it any options that fit your needs.
 * When your component renders, `useOfficerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOfficerQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOfficerQuery(baseOptions: Apollo.QueryHookOptions<OfficerQuery, OfficerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OfficerQuery, OfficerQueryVariables>(OfficerDocument, options);
      }
export function useOfficerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OfficerQuery, OfficerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OfficerQuery, OfficerQueryVariables>(OfficerDocument, options);
        }
export type OfficerQueryHookResult = ReturnType<typeof useOfficerQuery>;
export type OfficerLazyQueryHookResult = ReturnType<typeof useOfficerLazyQuery>;
export type OfficerQueryResult = Apollo.QueryResult<OfficerQuery, OfficerQueryVariables>;
export const OfficersDocument = gql`
    query Officers {
  officers {
    id
    officerNum
    firstName
    lastName
    type
  }
}
    `;

/**
 * __useOfficersQuery__
 *
 * To run a query within a React component, call `useOfficersQuery` and pass it any options that fit your needs.
 * When your component renders, `useOfficersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOfficersQuery({
 *   variables: {
 *   },
 * });
 */
export function useOfficersQuery(baseOptions?: Apollo.QueryHookOptions<OfficersQuery, OfficersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OfficersQuery, OfficersQueryVariables>(OfficersDocument, options);
      }
export function useOfficersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OfficersQuery, OfficersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OfficersQuery, OfficersQueryVariables>(OfficersDocument, options);
        }
export type OfficersQueryHookResult = ReturnType<typeof useOfficersQuery>;
export type OfficersLazyQueryHookResult = ReturnType<typeof useOfficersLazyQuery>;
export type OfficersQueryResult = Apollo.QueryResult<OfficersQuery, OfficersQueryVariables>;
export const CreateRepairRequestDocument = gql`
    mutation CreateRepairRequest($input: CreateRepairRequestInput!) {
  createRepairRequest(input: $input) {
    repairRequest {
      id
      note
      officerId
      officer {
        id
      }
      endoId
      endo {
        id
      }
    }
    errors {
      field
      message
    }
  }
}
    `;
export type CreateRepairRequestMutationFn = Apollo.MutationFunction<CreateRepairRequestMutation, CreateRepairRequestMutationVariables>;

/**
 * __useCreateRepairRequestMutation__
 *
 * To run a mutation, you first call `useCreateRepairRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRepairRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRepairRequestMutation, { data, loading, error }] = useCreateRepairRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRepairRequestMutation(baseOptions?: Apollo.MutationHookOptions<CreateRepairRequestMutation, CreateRepairRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRepairRequestMutation, CreateRepairRequestMutationVariables>(CreateRepairRequestDocument, options);
      }
export type CreateRepairRequestMutationHookResult = ReturnType<typeof useCreateRepairRequestMutation>;
export type CreateRepairRequestMutationResult = Apollo.MutationResult<CreateRepairRequestMutation>;
export type CreateRepairRequestMutationOptions = Apollo.BaseMutationOptions<CreateRepairRequestMutation, CreateRepairRequestMutationVariables>;
export const RemoveRepairRequestDocument = gql`
    mutation RemoveRepairRequest($id: String!) {
  removeRepairRequest(id: $id) {
    errors {
      field
      message
    }
    value
  }
}
    `;
export type RemoveRepairRequestMutationFn = Apollo.MutationFunction<RemoveRepairRequestMutation, RemoveRepairRequestMutationVariables>;

/**
 * __useRemoveRepairRequestMutation__
 *
 * To run a mutation, you first call `useRemoveRepairRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveRepairRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeRepairRequestMutation, { data, loading, error }] = useRemoveRepairRequestMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveRepairRequestMutation(baseOptions?: Apollo.MutationHookOptions<RemoveRepairRequestMutation, RemoveRepairRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveRepairRequestMutation, RemoveRepairRequestMutationVariables>(RemoveRepairRequestDocument, options);
      }
export type RemoveRepairRequestMutationHookResult = ReturnType<typeof useRemoveRepairRequestMutation>;
export type RemoveRepairRequestMutationResult = Apollo.MutationResult<RemoveRepairRequestMutation>;
export type RemoveRepairRequestMutationOptions = Apollo.BaseMutationOptions<RemoveRepairRequestMutation, RemoveRepairRequestMutationVariables>;
export const RepairRequestDocument = gql`
    query RepairRequest($id: String!) {
  repairRequest(id: $id) {
    id
    note
    officerId
    officer {
      id
    }
    endoId
    endo {
      id
    }
  }
}
    `;

/**
 * __useRepairRequestQuery__
 *
 * To run a query within a React component, call `useRepairRequestQuery` and pass it any options that fit your needs.
 * When your component renders, `useRepairRequestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRepairRequestQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRepairRequestQuery(baseOptions: Apollo.QueryHookOptions<RepairRequestQuery, RepairRequestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RepairRequestQuery, RepairRequestQueryVariables>(RepairRequestDocument, options);
      }
export function useRepairRequestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RepairRequestQuery, RepairRequestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RepairRequestQuery, RepairRequestQueryVariables>(RepairRequestDocument, options);
        }
export type RepairRequestQueryHookResult = ReturnType<typeof useRepairRequestQuery>;
export type RepairRequestLazyQueryHookResult = ReturnType<typeof useRepairRequestLazyQuery>;
export type RepairRequestQueryResult = Apollo.QueryResult<RepairRequestQuery, RepairRequestQueryVariables>;
export const RepairRequestsDocument = gql`
    query RepairRequests {
  repairRequests {
    id
    note
    officerId
    officer {
      id
    }
    endoId
    endo {
      id
    }
    createdAt
  }
}
    `;

/**
 * __useRepairRequestsQuery__
 *
 * To run a query within a React component, call `useRepairRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRepairRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRepairRequestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useRepairRequestsQuery(baseOptions?: Apollo.QueryHookOptions<RepairRequestsQuery, RepairRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RepairRequestsQuery, RepairRequestsQueryVariables>(RepairRequestsDocument, options);
      }
export function useRepairRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RepairRequestsQuery, RepairRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RepairRequestsQuery, RepairRequestsQueryVariables>(RepairRequestsDocument, options);
        }
export type RepairRequestsQueryHookResult = ReturnType<typeof useRepairRequestsQuery>;
export type RepairRequestsLazyQueryHookResult = ReturnType<typeof useRepairRequestsLazyQuery>;
export type RepairRequestsQueryResult = Apollo.QueryResult<RepairRequestsQuery, RepairRequestsQueryVariables>;
export const RepairRequestsByEndoDocument = gql`
    query RepairRequestsByEndo($endoId: String!) {
  repairRequestsByEndo(endoId: $endoId) {
    id
    note
    officerId
    officer {
      id
      officerNum
      firstName
      lastName
    }
    endoId
    endo {
      id
      serialNum
      dryingTime
      status
      brand
      type
      model
      lastPutBackISO
      position
    }
    createdAt
  }
}
    `;

/**
 * __useRepairRequestsByEndoQuery__
 *
 * To run a query within a React component, call `useRepairRequestsByEndoQuery` and pass it any options that fit your needs.
 * When your component renders, `useRepairRequestsByEndoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRepairRequestsByEndoQuery({
 *   variables: {
 *      endoId: // value for 'endoId'
 *   },
 * });
 */
export function useRepairRequestsByEndoQuery(baseOptions: Apollo.QueryHookOptions<RepairRequestsByEndoQuery, RepairRequestsByEndoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RepairRequestsByEndoQuery, RepairRequestsByEndoQueryVariables>(RepairRequestsByEndoDocument, options);
      }
export function useRepairRequestsByEndoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RepairRequestsByEndoQuery, RepairRequestsByEndoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RepairRequestsByEndoQuery, RepairRequestsByEndoQueryVariables>(RepairRequestsByEndoDocument, options);
        }
export type RepairRequestsByEndoQueryHookResult = ReturnType<typeof useRepairRequestsByEndoQuery>;
export type RepairRequestsByEndoLazyQueryHookResult = ReturnType<typeof useRepairRequestsByEndoLazyQuery>;
export type RepairRequestsByEndoQueryResult = Apollo.QueryResult<RepairRequestsByEndoQuery, RepairRequestsByEndoQueryVariables>;
export const UpdateRepairRequestDocument = gql`
    mutation UpdateRepairRequest($input: UpdateRepairRequestInput!) {
  updateRepairRequest(input: $input) {
    repairRequest {
      id
      note
      officerId
      officer {
        id
      }
      endoId
      endo {
        id
      }
    }
    errors {
      field
      message
    }
  }
}
    `;
export type UpdateRepairRequestMutationFn = Apollo.MutationFunction<UpdateRepairRequestMutation, UpdateRepairRequestMutationVariables>;

/**
 * __useUpdateRepairRequestMutation__
 *
 * To run a mutation, you first call `useUpdateRepairRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRepairRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRepairRequestMutation, { data, loading, error }] = useUpdateRepairRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRepairRequestMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRepairRequestMutation, UpdateRepairRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRepairRequestMutation, UpdateRepairRequestMutationVariables>(UpdateRepairRequestDocument, options);
      }
export type UpdateRepairRequestMutationHookResult = ReturnType<typeof useUpdateRepairRequestMutation>;
export type UpdateRepairRequestMutationResult = Apollo.MutationResult<UpdateRepairRequestMutation>;
export type UpdateRepairRequestMutationOptions = Apollo.BaseMutationOptions<UpdateRepairRequestMutation, UpdateRepairRequestMutationVariables>;
export const BlinkLocationDocument = gql`
    mutation BlinkLocation($input: RowAndColInput!) {
  blinkLocation(input: $input)
}
    `;
export type BlinkLocationMutationFn = Apollo.MutationFunction<BlinkLocationMutation, BlinkLocationMutationVariables>;

/**
 * __useBlinkLocationMutation__
 *
 * To run a mutation, you first call `useBlinkLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBlinkLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [blinkLocationMutation, { data, loading, error }] = useBlinkLocationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBlinkLocationMutation(baseOptions?: Apollo.MutationHookOptions<BlinkLocationMutation, BlinkLocationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BlinkLocationMutation, BlinkLocationMutationVariables>(BlinkLocationDocument, options);
      }
export type BlinkLocationMutationHookResult = ReturnType<typeof useBlinkLocationMutation>;
export type BlinkLocationMutationResult = Apollo.MutationResult<BlinkLocationMutation>;
export type BlinkLocationMutationOptions = Apollo.BaseMutationOptions<BlinkLocationMutation, BlinkLocationMutationVariables>;
export const CreateActionDocument = gql`
    mutation createAction($input: CreateActionInput!) {
  createAction(input: $input) {
    action {
      id
      type
      passed
      sessionId
    }
    errors {
      field
      message
    }
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
    endo {
      id
      status
    }
    status
    endoWasExpired
    endoWasOutOfOrder
    patientId
    patient {
      id
      hosNum
    }
    actions {
      id
      passed
      type
      createdAt
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
export const UpdateSettingDocument = gql`
    mutation UpdateSetting($input: UpdateSettingInput!) {
  updateSetting(input: $input) {
    id
    name
    value
  }
}
    `;
export type UpdateSettingMutationFn = Apollo.MutationFunction<UpdateSettingMutation, UpdateSettingMutationVariables>;

/**
 * __useUpdateSettingMutation__
 *
 * To run a mutation, you first call `useUpdateSettingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSettingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSettingMutation, { data, loading, error }] = useUpdateSettingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSettingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSettingMutation, UpdateSettingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSettingMutation, UpdateSettingMutationVariables>(UpdateSettingDocument, options);
      }
export type UpdateSettingMutationHookResult = ReturnType<typeof useUpdateSettingMutation>;
export type UpdateSettingMutationResult = Apollo.MutationResult<UpdateSettingMutation>;
export type UpdateSettingMutationOptions = Apollo.BaseMutationOptions<UpdateSettingMutation, UpdateSettingMutationVariables>;
export const SettingsDocument = gql`
    query Settings {
  settings {
    id
    name
    label
    description
    value
  }
}
    `;

/**
 * __useSettingsQuery__
 *
 * To run a query within a React component, call `useSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSettingsQuery(baseOptions?: Apollo.QueryHookOptions<SettingsQuery, SettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SettingsQuery, SettingsQueryVariables>(SettingsDocument, options);
      }
export function useSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SettingsQuery, SettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SettingsQuery, SettingsQueryVariables>(SettingsDocument, options);
        }
export type SettingsQueryHookResult = ReturnType<typeof useSettingsQuery>;
export type SettingsLazyQueryHookResult = ReturnType<typeof useSettingsLazyQuery>;
export type SettingsQueryResult = Apollo.QueryResult<SettingsQuery, SettingsQueryVariables>;
export const SnapshotIntervalMinsDocument = gql`
    query SnapshotIntervalMins {
  snapshotIntervalMins {
    id
    name
    value
    label
    description
  }
}
    `;

/**
 * __useSnapshotIntervalMinsQuery__
 *
 * To run a query within a React component, call `useSnapshotIntervalMinsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSnapshotIntervalMinsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSnapshotIntervalMinsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSnapshotIntervalMinsQuery(baseOptions?: Apollo.QueryHookOptions<SnapshotIntervalMinsQuery, SnapshotIntervalMinsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SnapshotIntervalMinsQuery, SnapshotIntervalMinsQueryVariables>(SnapshotIntervalMinsDocument, options);
      }
export function useSnapshotIntervalMinsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SnapshotIntervalMinsQuery, SnapshotIntervalMinsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SnapshotIntervalMinsQuery, SnapshotIntervalMinsQueryVariables>(SnapshotIntervalMinsDocument, options);
        }
export type SnapshotIntervalMinsQueryHookResult = ReturnType<typeof useSnapshotIntervalMinsQuery>;
export type SnapshotIntervalMinsLazyQueryHookResult = ReturnType<typeof useSnapshotIntervalMinsLazyQuery>;
export type SnapshotIntervalMinsQueryResult = Apollo.QueryResult<SnapshotIntervalMinsQuery, SnapshotIntervalMinsQueryVariables>;
export const PaginatedSnapshotsDocument = gql`
    query PaginatedSnapshots($input: PaginatedInput!) {
  paginatedSnapshots(input: $input) {
    meta {
      totalItems
      totalPages
      itemCount
      itemsPerPage
      currentPage
    }
    items {
      id
      hum
      temp
      systemStatus
      containerId
      createdAt
      container {
        id
        col
      }
    }
  }
}
    `;

/**
 * __usePaginatedSnapshotsQuery__
 *
 * To run a query within a React component, call `usePaginatedSnapshotsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaginatedSnapshotsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaginatedSnapshotsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePaginatedSnapshotsQuery(baseOptions: Apollo.QueryHookOptions<PaginatedSnapshotsQuery, PaginatedSnapshotsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaginatedSnapshotsQuery, PaginatedSnapshotsQueryVariables>(PaginatedSnapshotsDocument, options);
      }
export function usePaginatedSnapshotsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaginatedSnapshotsQuery, PaginatedSnapshotsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaginatedSnapshotsQuery, PaginatedSnapshotsQueryVariables>(PaginatedSnapshotsDocument, options);
        }
export type PaginatedSnapshotsQueryHookResult = ReturnType<typeof usePaginatedSnapshotsQuery>;
export type PaginatedSnapshotsLazyQueryHookResult = ReturnType<typeof usePaginatedSnapshotsLazyQuery>;
export type PaginatedSnapshotsQueryResult = Apollo.QueryResult<PaginatedSnapshotsQuery, PaginatedSnapshotsQueryVariables>;
export const SnapshotsDocument = gql`
    query Snapshots {
  snapshots {
    id
    hum
    temp
    systemStatus
    createdAt
    containerId
    container {
      id
      col
    }
  }
}
    `;

/**
 * __useSnapshotsQuery__
 *
 * To run a query within a React component, call `useSnapshotsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSnapshotsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSnapshotsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSnapshotsQuery(baseOptions?: Apollo.QueryHookOptions<SnapshotsQuery, SnapshotsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SnapshotsQuery, SnapshotsQueryVariables>(SnapshotsDocument, options);
      }
export function useSnapshotsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SnapshotsQuery, SnapshotsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SnapshotsQuery, SnapshotsQueryVariables>(SnapshotsDocument, options);
        }
export type SnapshotsQueryHookResult = ReturnType<typeof useSnapshotsQuery>;
export type SnapshotsLazyQueryHookResult = ReturnType<typeof useSnapshotsLazyQuery>;
export type SnapshotsQueryResult = Apollo.QueryResult<SnapshotsQuery, SnapshotsQueryVariables>;
export const SubscribeToOverHumOrTempDocument = gql`
    subscription SubscribeToOverHumOrTemp($humThreshold: String!, $tempThreshold: String!) {
  subscribeToOverHumOrTemp(
    humThreshold: $humThreshold
    tempThreshold: $tempThreshold
  ) {
    id
    hum
    temp
    container {
      id
      col
    }
  }
}
    `;

/**
 * __useSubscribeToOverHumOrTempSubscription__
 *
 * To run a query within a React component, call `useSubscribeToOverHumOrTempSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeToOverHumOrTempSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeToOverHumOrTempSubscription({
 *   variables: {
 *      humThreshold: // value for 'humThreshold'
 *      tempThreshold: // value for 'tempThreshold'
 *   },
 * });
 */
export function useSubscribeToOverHumOrTempSubscription(baseOptions: Apollo.SubscriptionHookOptions<SubscribeToOverHumOrTempSubscription, SubscribeToOverHumOrTempSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribeToOverHumOrTempSubscription, SubscribeToOverHumOrTempSubscriptionVariables>(SubscribeToOverHumOrTempDocument, options);
      }
export type SubscribeToOverHumOrTempSubscriptionHookResult = ReturnType<typeof useSubscribeToOverHumOrTempSubscription>;
export type SubscribeToOverHumOrTempSubscriptionResult = Apollo.SubscriptionResult<SubscribeToOverHumOrTempSubscription>;
export const EmptyTraysDocument = gql`
    query EmptyTrays {
  emptyTrays {
    id
    position
    row
    container {
      id
    }
  }
}
    `;

/**
 * __useEmptyTraysQuery__
 *
 * To run a query within a React component, call `useEmptyTraysQuery` and pass it any options that fit your needs.
 * When your component renders, `useEmptyTraysQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEmptyTraysQuery({
 *   variables: {
 *   },
 * });
 */
export function useEmptyTraysQuery(baseOptions?: Apollo.QueryHookOptions<EmptyTraysQuery, EmptyTraysQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EmptyTraysQuery, EmptyTraysQueryVariables>(EmptyTraysDocument, options);
      }
export function useEmptyTraysLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EmptyTraysQuery, EmptyTraysQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EmptyTraysQuery, EmptyTraysQueryVariables>(EmptyTraysDocument, options);
        }
export type EmptyTraysQueryHookResult = ReturnType<typeof useEmptyTraysQuery>;
export type EmptyTraysLazyQueryHookResult = ReturnType<typeof useEmptyTraysLazyQuery>;
export type EmptyTraysQueryResult = Apollo.QueryResult<EmptyTraysQuery, EmptyTraysQueryVariables>;