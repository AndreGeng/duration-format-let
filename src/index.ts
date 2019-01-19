enum DurationUnit {
  y = 'y',
  mo = 'mo',
  w = 'w',
  d = 'd',
  h = 'h',
  m = 'm',
  s = 's',
  ms = 'ms',
}
type DurationUnitKey = keyof typeof DurationUnit;
type DurationUnitDict = {
  [key in DurationUnit]?: string;
}
interface DurationFormatOption {
  delimiter?: string;
  unit?: DurationUnitKey;
  disableUnits?: DurationUnitKey[],
  labelObj?: DurationUnitDict;
}

function durationFormat(
  duration: number,
  opts: DurationFormatOption = {},
) {
  const defaultLabelObj = {
    'y': 'y',
    'mo': 'mo',
    'w': 'w',
    'd': 'd',
    'h': 'h',
    'm': 'm',
    's': 's',
    'ms': 'ms'
  };
  const defaultOpts: DurationFormatOption = {
    delimiter: '',
    unit: DurationUnit.ms,
    disableUnits: [],
    labelObj: {},
  };
  const unitMeasures: {[index: string]: number} = {
    y: 31557600000,
    mo: 2629800000,
    w: 604800000,
    d: 86400000,
    h: 3600000,
    m: 60000,
    s: 1000,
    ms: 1,
  };
  const options = Object.assign({}, defaultOpts, opts);
  options.labelObj = Object.assign({}, defaultLabelObj, options.labelObj);
  const durationInMs = unitMeasures[options.unit as string] * duration;
  let remainMs = durationInMs;
  const result: string[] = Object.keys(unitMeasures).reduce((acc, item) => {
    const {
      disableUnits = [],
      labelObj,
    } = options;
    const num = Math.floor(remainMs / unitMeasures[item]);
    if (disableUnits.indexOf(item as DurationUnitKey) === -1 &&
      num > 0) {
      acc.push(`${num}${labelObj[item as DurationUnitKey]}`);
      remainMs -= num * unitMeasures[item];
    }
    return acc;
  }, [] as string[]);
  return result.join(options.delimiter);
}

export default durationFormat;
