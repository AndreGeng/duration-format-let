import dfl from '../src/index';

let { 
  test,
  expect,
  describe,
} = global as any;

describe('basic format', () => {
  test('duration should be formatted correctly', () => {
    expect(dfl(1)).toBe('1ms');
    expect(dfl(1000)).toBe('1s');
    expect(dfl(60*1000)).toBe('1m');
    expect(dfl(60*60*1000)).toBe('1h');
    expect(dfl(24*60*60*1000)).toBe('1d');
    expect(dfl(7*24*60*60*1000)).toBe('1w');
    expect(dfl(365.25*24*60*60*1000/12)).toBe('1mo');
    expect(dfl(365.25*24*60*60*1000)).toBe('1y');
  });
});
describe('DurationFormatOption should work as expected', () => {
  test('delimiter', () => {
    expect(dfl(97320000)).toBe('1d3h2m');
    expect(dfl(97320000, { delimiter: ',' })).toBe('1d,3h,2m');
  });
  test('unit', () => {
    expect(dfl(1000)).toBe('1s');
    expect(dfl(1000, { unit: 'h' })).toBe('1mo1w4d5h30m');
  });
  test('disableUnits', () => {
    expect(dfl(9000 * 1000)).toBe('2h30m');
    expect(dfl(9000 * 1000, { disableUnits: ['m'] })).toBe('2h1800s');
    expect(dfl(9000 * 1000, { disableUnits: ['m', 's'] })).toBe('2h1800000ms');
    expect(dfl(9000 * 1000, { disableUnits: ['m', 's', 'ms'] })).toBe('2h');
  });
  test('unitMeasures', () => {
    expect(dfl(1000*60*60*1000)).toBe('1mo1w4d5h30m');
    expect(dfl(1000*60*60*1000, {
      unitMeasures: {
        mo: 30*24*60*60*1000,
      },
    })).toBe('1mo1w4d16h');
  });
  test('labelObj', () => {
    expect(dfl(1000*60*60*1000)).toBe('1mo1w4d5h30m');
    expect(dfl(1000*60*60*1000, {
      labelObj: {
        mo: 'month',
        w: 'week',
        d: 'day',
        h: 'hour',
        m: 'minute'
      }
    })).toBe('1month1week4day5hour30minute');
    expect(dfl(1000*60*60*1000, {
      labelObj: {
        mo: num => `month${num > 1 ? 's' : ''}`,
        w: num => `week${num > 1 ? 's' : ''}`,
        d: num => `day${num > 1 ? 's' : ''}`,
        h: num => `hour${num > 1 ? 's' : ''}`,
        m: num => `minute${num > 1 ? 's' : ''}`
      }
    })).toBe('1month1week4days5hours30minutes');
  });
});
