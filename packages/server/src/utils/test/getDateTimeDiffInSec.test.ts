import dayjs from 'dayjs';
import { getDateTimeDiffInSec } from '../getDateTimeDiffInSec';

describe('getDateTimeDiffInSec', () => {
  const day1 = dayjs('2000-01-01 19:18:17');
  const day2 = dayjs('2000-01-02 19:18:17');

  const secPerDay = 1 * 24 * 60 * 60;

  test('should return the correct numbers (string)', () => {
    expect(getDateTimeDiffInSec(day1, day2)).toEqual(secPerDay);
  });
});
