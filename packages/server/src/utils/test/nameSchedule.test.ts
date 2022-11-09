import { nameSchedule } from '../nameSchedule';

describe('nameSchedule', () => {
  const expectedName = 'Schedule: Endo xxx is to be ready';
  test('should return the correct scheduel name', () => {
    expect(nameSchedule({ endoId: 'xxx', status: 'ready' })).toEqual(
      expectedName,
    );
  });
});
