import { dayToMillisec } from '../dayToMillisec';

describe('dayToMillisec', () => {
  const day = 1;
  const days = 2;

  const expect1 = 1 * 24 * 60 * 60 * 1000;
  const expect2 = 2 * 24 * 60 * 60 * 1000;

  test('should return the correct numbers (string)', () => {
    expect(dayToMillisec(day)).toEqual(expect1);
    expect(dayToMillisec(days)).toEqual(expect2);
  });
});
