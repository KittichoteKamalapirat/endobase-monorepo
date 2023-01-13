import { rowNumToLEDPosition } from '../rowNumToLEDPosition';

describe('rowNumToLEDPosition', () => {
  const input1 = 1;
  const input2 = 2;
  const input3 = 3;
  const input4 = 4;
  const input5 = 5;
  const input6 = 6;
  const input7 = 7;
  const input8 = 8;


  const expect1 = '00';
  const expect2 = '01';
  const expect3 = '02';
  const expect4 = '03';
  const expect5 = '04';
  const expect6 = '05';
  const expect7 = '06';
  const expect8 = '07';

  test('should return the correct numbers (string)', () => {
    expect(rowNumToLEDPosition(input1)).toEqual(expect1);
    expect(rowNumToLEDPosition(input2)).toEqual(expect2);
    expect(rowNumToLEDPosition(input3)).toEqual(expect3);
    expect(rowNumToLEDPosition(input4)).toEqual(expect4);
    expect(rowNumToLEDPosition(input5)).toEqual(expect5);
    expect(rowNumToLEDPosition(input6)).toEqual(expect6);
    expect(rowNumToLEDPosition(input7)).toEqual(expect7);
    expect(rowNumToLEDPosition(input8)).toEqual(expect8);
  });
});
