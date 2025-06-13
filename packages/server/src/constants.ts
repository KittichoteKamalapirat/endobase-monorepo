import { Env } from './utils/getEnvPath';

const env = process.env.NODE_ENV as Env;
// timeouts
export const SET_ACTIVE_MODBUS_TIMEOUT = 2000;
export const UPDATE_CONTAINER_STATS_TIMEOUT = 4000;
export const CREATE_SNAPSHOT_TIMEOUT = 6000;

// crons
// - storage days
export const MAX_STORAGE_DAYS = 31;
export const EXPIRE_SOON_DAYS = 1;

// config
export const IS_PROD = env === 'production';
export const COOKIE_NAME = 'qidRedis';
export const SESSION_SECRET = 'secretkpodfqpemvqemfvef';

export const DAYJS_DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss'; // save this in db for schedule table

// pubsub
export const snapshotTriggertName = 'snapshotAdded';

const HADYAI_CONTAINER_TO_ARDUINO_ID_MAPPER = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
};

const CHONBURI_CONTAINER_TO_ARDUINO_ID_MAPPER = {
  a: 1,
  b: 2,
};

const ENDO_CONTAINER_TO_ARDUINO_ID_MAPPER = {
  a: 1,
  b: 2,
};

export const getColumnToArduinoIdMapper = (env: Env) => {
  switch (env) {
    case 'chonburi':
      return CHONBURI_CONTAINER_TO_ARDUINO_ID_MAPPER;
    case 'endo':
      return ENDO_CONTAINER_TO_ARDUINO_ID_MAPPER;
    case 'hadyai':
      return HADYAI_CONTAINER_TO_ARDUINO_ID_MAPPER;
    default:
      return HADYAI_CONTAINER_TO_ARDUINO_ID_MAPPER;
  }
};
export const colorToNumber = {
  off: 0,
  red: 0,
  green: 0,
  blue: 0,
  white: 0,
};

export const SLAVE_ADDRESS = 0;
export const INPUT_REGISTER_LENGTH = 3;

// Container config
// all 16 trays
export const HADYAI_CONTAINER_TYPE_OBJ = {
  a: 'A',
  b: 'B',
  c: 'C',
  d: 'D',
  e: 'E',
  f: 'F',
  g: 'G',
} as const;

export const CHONBURI_CONTAINER_TYPE_OBJ = {
  a: 'A', // 8 trays
  b: 'B', // 16 trays
} as const;

export const ENDO_CONTAINER_TYPE_OBJ = {
  a: 'A', // 8 trays
  b: 'B', // 16 trays
} as const;

export const CONTAINER_TYPE_OBJ = (() => {
  switch (env) {
    case 'chonburi':
      return CHONBURI_CONTAINER_TYPE_OBJ;
    case 'endo':
      return ENDO_CONTAINER_TYPE_OBJ;
    case 'hadyai':
      return HADYAI_CONTAINER_TYPE_OBJ;
    default:
      return HADYAI_CONTAINER_TYPE_OBJ;
  }
})();

export const HADYAI_CONTAINER_TO_TRAY_NUM_MAPPER: Record<
  keyof typeof HADYAI_CONTAINER_TYPE_OBJ,
  number
> = {
  a: 16,
  b: 16,
  c: 16,
  d: 16,
  e: 16,
  f: 16,
  g: 16,
};

export const CHONBURI_CONTAINER_TO_TRAY_NUM_MAPPER: Record<
  keyof typeof CHONBURI_CONTAINER_TYPE_OBJ,
  number
> = {
  a: 8,
  b: 16,
};

export const ENDO_CONTAINER_TO_TRAY_NUM_MAPPER: Record<
  keyof typeof CHONBURI_CONTAINER_TYPE_OBJ,
  number
> = {
  a: 8,
  b: 16,
};

export const CONTAINER_TO_TRAY_NUM_MAPPER = (() => {
  switch (env) {
    case 'chonburi':
      return CHONBURI_CONTAINER_TO_TRAY_NUM_MAPPER;
    case 'endo':
      return ENDO_CONTAINER_TO_TRAY_NUM_MAPPER;
    case 'hadyai':
      return HADYAI_CONTAINER_TO_TRAY_NUM_MAPPER;
    default:
      return HADYAI_CONTAINER_TO_TRAY_NUM_MAPPER;
  }
})();
