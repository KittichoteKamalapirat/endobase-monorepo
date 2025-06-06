import { Env } from './utils/getEnvPath';

// timeouts
export const SET_ACTIVE_MODBUS_TIMEOUT = 2000;
export const UPDATE_CONTAINER_STATS_TIMEOUT = 4000;
export const CREATE_SNAPSHOT_TIMEOUT = 6000;

// crons
// - storage days
export const MAX_STORAGE_DAYS = 31;
export const EXPIRE_SOON_DAYS = 1;

// config
export const IS_PROD = process.env.NODE_ENV === 'production';
export const COOKIE_NAME = 'qidRedis';
export const SESSION_SECRET = 'secretkpodfqpemvqemfvef';

export const DAYJS_DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss'; // save this in db for schedule table

// pubsub
export const snapshotTriggertName = 'snapshotAdded';

// new serialport: modbus
export const COM_PORT = (() => {
  switch (process.env.NODE_ENV) {
    case 'hadyai':
      return 'COM7';
    case 'endo':
      return 'COM3';
    default:
      return 'COM5';
  }
})();


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
