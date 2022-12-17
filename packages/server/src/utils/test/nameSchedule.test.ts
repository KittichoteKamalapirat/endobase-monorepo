import dayjs from 'dayjs';
import { DAYJS_DATE_TIME_FORMAT } from '../../constants';
import { nameSchedule } from '../nameSchedule';

describe('nameSchedule', () => {
  const jsDate = new Date();

  const expectedName = `Schedule: Endo xxx is to be ready at ${dayjs(
    jsDate,
  ).format(DAYJS_DATE_TIME_FORMAT)}`;
  test('should return the correct scheduel name', () => {
    expect(nameSchedule({ endoId: 'xxx', status: 'ready', jsDate })).toEqual(
      expectedName,
    );
  });
});
