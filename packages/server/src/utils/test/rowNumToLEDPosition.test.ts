import { rowNumToLEDPosition } from '../rowNumToLEDPosition';

describe('rowNumToLEDPosition', () => {
  const input1 = 1;
  const input2 = 2;
  const input3 = 10;
  const input4 = 16;

  const expect1 = '00';
  const expect2 = '01';
  const expect3 = '09';
  const expect4 = '15';

  test('should return the correct numbers (string)', () => {
    expect(rowNumToLEDPosition(input1)).toEqual(expect1);
    expect(rowNumToLEDPosition(input2)).toEqual(expect2);
    expect(rowNumToLEDPosition(input3)).toEqual(expect3);
    expect(rowNumToLEDPosition(input4)).toEqual(expect4);
  });
});
