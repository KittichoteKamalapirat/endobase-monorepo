import { minToMillisec } from '../minToMillisec';

describe('minToMillisec', () => {
  const day = 1;
  const days = 2;

  const expect1 = 1 * 60 * 1000;
  const expect2 = 2 * 60 * 1000;

  test('should return the correct numbers (string)', () => {
    expect(minToMillisec(day)).toEqual(expect1);
    expect(minToMillisec(days)).toEqual(expect2);
  });
});
