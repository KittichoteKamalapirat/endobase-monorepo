import { dayToSec } from '../dayToSec';

describe('dayToSec', () => {
  const day = 1;
  const days = 2;

  const expect1 = 1 * 24 * 60 * 60;
  const expect2 = 2 * 24 * 60 * 60;

  test('should return the correct numbers (string)', () => {
    expect(dayToSec(day)).toEqual(expect1);
    expect(dayToSec(days)).toEqual(expect2);
  });
});
