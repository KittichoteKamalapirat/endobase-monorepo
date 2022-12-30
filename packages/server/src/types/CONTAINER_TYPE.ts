// value: key
// value => a (save in db)
// key => A (what is display)

import { SerialPort } from 'serialport';

export const CONTAINER_TYPE_OBJ = {
  a: 'A',
  b: 'B',
  c: 'C',
  // d: 'D',
  // e: 'E',
  // f: 'F',
  // g: 'G',
  // h: 'H',
} as const;

export type CONTAINER_TYPE_VALUES = keyof typeof CONTAINER_TYPE_OBJ;
export type CONTAINER_TYPE_LABELS =
  typeof CONTAINER_TYPE_OBJ[CONTAINER_TYPE_VALUES];

export const CONTAINER_TO_SERIALPORT_PATH_MAPPER: Record<
  CONTAINER_TYPE_VALUES,
  string
> = {
  a: 'COM3',
  b: 'COM4',
  c: 'COM11',
  // d: '/dev/tty.usbserial-7',
  // e: '/dev/tty.usbserial-9',
  // f: '/dev/tty.usbserial-11',
  // g: '/dev/tty.usbserial-13',
  // h: '/dev/tty.usbserial-15',
};

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
