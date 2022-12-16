import dayjs from 'dayjs';
import { DAYJS_DATE_TIME_FORMAT } from '../../constants';
import { nameSchedule } from '../nameSchedule';

describe('nameSchedule', () => {
  const seconds = 1000;
  const time = dayjs().add(seconds, 'seconds').format(DAYJS_DATE_TIME_FORMAT);

  const expectedName = `Schedule: Endo xxx is to be ready at ${time}`;
  test('should return the correct scheduel name', () => {
    expect(nameSchedule({ endoId: 'xxx', status: 'ready', seconds })).toEqual(
      expectedName,
    );
  });
});
