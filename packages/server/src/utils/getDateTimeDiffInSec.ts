import dayjs from 'dayjs';

export const getDateTimeDiffInSec = (
  date1: dayjs.Dayjs,
  date2: dayjs.Dayjs,
): number => {
  // x.diff(y) => x shold be after y to be positive
  // but I'll add abs anyway
  return date2.diff(date1) / 1000;
};
