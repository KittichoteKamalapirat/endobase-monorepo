import dayjs from 'dayjs';

export const getDateTimeDiffInMilliSec = (
  date1: dayjs.Dayjs,
  date2: dayjs.Dayjs,
): number => {
  // x.diff(y) => x shold be after y to be positive
  // but I'll add abs anyway
  return Math.abs(date2.diff(date1));
};
