import { numTo3Digits } from '../numTo3Digits';

describe('numTo3Digits', () => {
  const input1 = 1;
  const input2 = 11;
  const input3 = 111;

  const expect1 = '001';
  const expect2 = '011';

  const expect3 = '111';

  test('should return the correct numbers (string)', () => {
    expect(numTo3Digits(input1)).toEqual(expect1);
    expect(numTo3Digits(input2)).toEqual(expect2);
    expect(numTo3Digits(input3)).toEqual(expect3);
  });
});
