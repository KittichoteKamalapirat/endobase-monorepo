import dayjs from 'dayjs';
import { getDateTimeDiffInMilliSec } from '../getDateTimeDiffInMilliSec';

describe('getDateTimeDiffInMilliSec', () => {
  const day1 = dayjs('2000-01-01 19:18:17');
  const day2 = dayjs('2000-01-02 19:18:17');

  const milliSecPerDay = 1 * 24 * 60 * 60 * 1000;

  test('should return the correct numbers (string)', () => {
    expect(getDateTimeDiffInMilliSec(day1, day2)).toEqual(milliSecPerDay);
  });
});
