import dayjs from 'dayjs';

export const getDateTimeDiffInSec = (
  date1: dayjs.Dayjs,
  date2: dayjs.Dayjs,
): number => {
  // x.diff(y) => x should be after y to be positive
  return date2.diff(date1) / 1000;
};
