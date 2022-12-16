import { rowNumToLEDPositionTwoCols } from '../rowNumToLEDPositionTwoCols';

describe('rowNumToLEDPositionTwoCols', () => {
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

  const expect9 = '15';
  const expect10 = '14';
  const expect11 = '13';
  const expect12 = '12';
  const expect13 = '11';
  const expect14 = '10';
  const expect15 = '09';
  const expect16 = '08';

  test('should return the correct numbers (string)', () => {
    expect(rowNumToLEDPositionTwoCols(input1)).toEqual(expect1);
    expect(rowNumToLEDPositionTwoCols(input2)).toEqual(expect2);
    expect(rowNumToLEDPositionTwoCols(input3)).toEqual(expect3);
    expect(rowNumToLEDPositionTwoCols(input4)).toEqual(expect4);
    expect(rowNumToLEDPositionTwoCols(input5)).toEqual(expect5);
    expect(rowNumToLEDPositionTwoCols(input6)).toEqual(expect6);
    expect(rowNumToLEDPositionTwoCols(input7)).toEqual(expect7);
    expect(rowNumToLEDPositionTwoCols(input8)).toEqual(expect8);
    expect(rowNumToLEDPositionTwoCols(input9)).toEqual(expect9);
    expect(rowNumToLEDPositionTwoCols(input10)).toEqual(expect10);
    expect(rowNumToLEDPositionTwoCols(input11)).toEqual(expect11);
    expect(rowNumToLEDPositionTwoCols(input12)).toEqual(expect12);
    expect(rowNumToLEDPositionTwoCols(input13)).toEqual(expect13);
    expect(rowNumToLEDPositionTwoCols(input14)).toEqual(expect14);
    expect(rowNumToLEDPositionTwoCols(input15)).toEqual(expect15);
    expect(rowNumToLEDPositionTwoCols(input16)).toEqual(expect16);
  });
});
