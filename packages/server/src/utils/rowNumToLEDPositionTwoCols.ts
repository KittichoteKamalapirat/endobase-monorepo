import { RowType } from '../resources/trays/entities/tray.entity';
import { rowNumToLEDPosition } from './rowNumToLEDPosition';

export const rowNumToLEDPositionTwoCols = (rowNum: RowType, length = 2) => {
  // 1 => 00 // 9 => 15
  // 2 => 01 // 10 => 14
  // 3 => 02 // 11 => 13
  // 4 => 03 // 12 => 12
  // 5 => 04 // 13 => 11
  // 6 => 05 // 14 => 10
  // 7 => 06 // 15 => 09
  // 8 => 07 // 16 => 08

  if (rowNum <= 8) return rowNumToLEDPosition(rowNum);

  const ledPosition = 24 - rowNum; // could result in 8-15

  // look how many digits to add
  // add it according to how many to add
  let len = length - ('' + ledPosition).length;
  return (len > 0 ? new Array(++len).join('0') : '') + ledPosition; // -1 because rowNum starts from 1 instead of 0
};
