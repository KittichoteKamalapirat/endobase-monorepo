export const serialportPathA = '/dev/tty.usbserial-0001';
export const serialportPathB = '/dev/tty.usbserial-3';
export const serialportPathC = '/dev/tty.usbserial-5';

export const SERIALPORTS_PROVIDER = 'allSerialports';

export const RED_COLOR_COMMAND = '255,000,000'; // expired
export const GREEN_COLOR_COMMAND = '000,255,000'; // ready
export const BLUE_COLOR_COMMAND = '000,000,255'; // drying
export const WHITE_COLOR_COMMAND = '255,255,255';
export const BLACK_COLOR_COMMAND = '000,000,000'; // endo not here: being_used,  disinfection_passed, disinfection_failed,leak_test_failed, leak_test_passed
export const YELLOW_COLOR_COMMAND = '120,120,000'; // expired_soon
export const ORANGE_COLOR_COMMAND = '255,165,000';

export const MAX_STORAGE_DAYS = 31;

export const CONTAINER_NUM = 3;
export const DEFAULT_SNAPSHOT_INTERVAL_MINS = 60;

// config
export const IS_PROD = process.env.NODE_ENV === 'production';
export const COOKIE_NAME = 'qidRedis';
export const SESSION_SECRET = 'secretkpodfqpemvqemfvef';

export const DAYJS_DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss'; // save this in db for schedule table
