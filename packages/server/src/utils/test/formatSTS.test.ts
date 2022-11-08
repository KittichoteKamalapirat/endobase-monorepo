import { formatSTS } from '../formatSTS';

describe('formatSTS', () => {
  const input1 = ':sts128,tem30.1,hum44.4';
  const input2 = ':sts128,tem030.1,hum044.4';

  const expect1 = {
    systemStatus: '128',
    temp: '30.1',
    hum: '44.4',
  };

  const expect2 = {
    systemStatus: '128',
    temp: '030.1',
    hum: '044.4',
  };

  test('should return the correct numbers (string)', () => {
    expect(formatSTS(input1)).toEqual(expect1);
    expect(formatSTS(input2)).toEqual(expect2);
  });
});
