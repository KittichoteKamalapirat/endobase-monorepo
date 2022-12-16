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
  const input9 = 9;
  const input10 = 10;
  const input11 = 11;
  const input12 = 12;
  const input13 = 13;
  const input14 = 14;
  const input15 = 15;
  const input16 = 16;

  const expect1 = '00';
  const expect2 = '01';
  const expect3 = '02';
  const expect4 = '03';
  const expect5 = '04';
  const expect6 = '05';
  const expect7 = '06';
  const expect8 = '07';

  const expect9 = '08';
  const expect10 = '09';
  const expect11 = '10';
  const expect12 = '11';
  const expect13 = '12';
  const expect14 = '13';
  const expect15 = '14';
  const expect16 = '15';

  test('should return the correct numbers (string)', () => {
    expect(rowNumToLEDPosition(input1)).toEqual(expect1);
    expect(rowNumToLEDPosition(input2)).toEqual(expect2);
    expect(rowNumToLEDPosition(input3)).toEqual(expect3);
    expect(rowNumToLEDPosition(input4)).toEqual(expect4);
    expect(rowNumToLEDPosition(input5)).toEqual(expect5);
    expect(rowNumToLEDPosition(input6)).toEqual(expect6);
    expect(rowNumToLEDPosition(input7)).toEqual(expect7);
    expect(rowNumToLEDPosition(input8)).toEqual(expect8);
    expect(rowNumToLEDPosition(input9)).toEqual(expect9);
    expect(rowNumToLEDPosition(input10)).toEqual(expect10);
    expect(rowNumToLEDPosition(input11)).toEqual(expect11);
    expect(rowNumToLEDPosition(input12)).toEqual(expect12);
    expect(rowNumToLEDPosition(input13)).toEqual(expect13);
    expect(rowNumToLEDPosition(input14)).toEqual(expect14);
    expect(rowNumToLEDPosition(input15)).toEqual(expect15);
    expect(rowNumToLEDPosition(input16)).toEqual(expect16);
  });
});
