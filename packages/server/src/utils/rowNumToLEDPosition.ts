import { RowType } from '../resources/trays/entities/tray.entity';

export const rowNumToLEDPosition = (rowNum: RowType, length = 2) => {
  // 1 => 00
  // 2 => 01
  // 10 => 09
  // 16 => 15
  const zeroIndexRowNum = rowNum - 1;

  // look how many digits to add
  // add it according to how many to add
  let len = length - ('' + zeroIndexRowNum).length;
  return (len > 0 ? new Array(++len).join('0') : '') + zeroIndexRowNum; // -1 because rowNum starts from 1 instead of 0
};
