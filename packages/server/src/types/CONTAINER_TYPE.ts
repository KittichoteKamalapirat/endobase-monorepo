// value: key
// value => a (save in db)
// key => A (what is display)

import { SerialPort } from 'serialport';

export const CONTAINER_TYPE_OBJ = {
  a: 'A',
  b: 'B',
  c: 'C',
  d: 'D',
  e: 'E',
  f: 'F',
  g: 'G',
} as const;

export type CONTAINER_TYPE_VALUES = keyof typeof CONTAINER_TYPE_OBJ;
export type CONTAINER_TYPE_LABELS =
  typeof CONTAINER_TYPE_OBJ[CONTAINER_TYPE_VALUES];


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
