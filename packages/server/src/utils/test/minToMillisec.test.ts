import { minToSec } from '../minToSec';

describe('minToSec', () => {
  const day = 1;
  const days = 2;

  const expect1 = 1 * 60;
  const expect2 = 2 * 60;

  test('should return the correct numbers (string)', () => {
    expect(minToSec(day)).toEqual(expect1);
    expect(minToSec(days)).toEqual(expect2);
  });
});
