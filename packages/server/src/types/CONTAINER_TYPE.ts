// value: key
// value => a (save in db)
// key => A (what is display)

import { SerialPort } from 'serialport';

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

export const CONTAINER_TYPE_OBJ =
  process.env.NODE_ENV === 'chonburi'
    ? CHONBURI_CONTAINER_TYPE_OBJ
    : HADYAI_CONTAINER_TYPE_OBJ;

export type CONTAINER_TYPE_VALUES = keyof typeof CONTAINER_TYPE_OBJ;
export type CONTAINER_TYPE_LABELS =
  (typeof CONTAINER_TYPE_OBJ)[CONTAINER_TYPE_VALUES];

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

export const CONTAINER_TO_TRAY_NUM_MAPPER =
  process.env.NODE_ENV === 'chonburi'
    ? CHONBURI_CONTAINER_TO_TRAY_NUM_MAPPER
    : HADYAI_CONTAINER_TO_TRAY_NUM_MAPPER;

interface ContainerTypeOption {
  value: CONTAINER_TYPE_VALUES;
  label: CONTAINER_TYPE_LABELS;
}
export const containerTypeOptions: ContainerTypeOption[] = Object.keys(
  CONTAINER_TYPE_OBJ,
).map((key) => ({
  value: key as CONTAINER_TYPE_VALUES,
  label: CONTAINER_TYPE_OBJ[key as CONTAINER_TYPE_VALUES],
}));

export type MySerialPort = Record<CONTAINER_TYPE_VALUES, SerialPort>;
export type MyParser = Record<CONTAINER_TYPE_VALUES, any>;
