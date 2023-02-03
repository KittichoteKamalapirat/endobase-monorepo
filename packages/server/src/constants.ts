// timeouts
export const SET_ACTIVE_MODBUS_TIMEOUT = 2000
export const UPDATE_CONTAINER_STATS_TIMEOUT = 4000
export const CREATE_SNAPSHOT_TIMEOUT = 6000

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
export const COM_PORT = "COM6"
export const columnToArduinoIdMapper = {
    a: 1, // start from arduino 1
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
}
export const colorToNumber = {
    "off": 0,
    "red": 0,
    "green": 0,
    "blue": 0,
    "white": 0,
}