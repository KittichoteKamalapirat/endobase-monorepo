import { RowType } from '../resources/trays/entities/tray.entity';

export const rowNumToLEDPosition = (rowNum: RowType, length = 2) => {
  // 1 => 00
  // 2 => 01
  // 16 => 15
  let len = length - ('' + rowNum).length;
  return (len > 0 ? new Array(++len).join('0') : '') + (rowNum - 1); // -1 because rowNum starts from 1 instead of 0
};
