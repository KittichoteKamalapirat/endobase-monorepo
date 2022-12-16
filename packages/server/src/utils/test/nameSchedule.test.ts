import { nameSchedule } from '../nameSchedule';

describe('nameSchedule', () => {
  const dateTime = new Date();

  const expectedName = `Schedule: Endo xxx is to be ready at ${dateTime.toISOString()}`;
  test('should return the correct scheduel name', () => {
    expect(nameSchedule({ endoId: 'xxx', status: 'ready', dateTime })).toEqual(
      expectedName,
    );
  });
});
