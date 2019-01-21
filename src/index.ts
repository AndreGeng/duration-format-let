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
type DurationUnitDict<T> = {
  [key in DurationUnit]: T;
}
type UnitLabelFunc = (num: number) => string;
interface DurationFormatOption {
  delimiter: string;
  unit: DurationUnitKey;
  disableUnits: DurationUnitKey[],
  unitMeasures: Partial<DurationUnitDict<number>>,
  labelObj: Partial<DurationUnitDict<string | UnitLabelFunc>>;
}

const getUnitLabel = (num: number, label: string | UnitLabelFunc) => {
  if (typeof label=== 'function') {
    return label(num);
  }
  return label;
};
function durationFormat(
  duration: number,
  opts: Partial<DurationFormatOption> = {},
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
  const defaultUnitMeasures = {
    y: 365.25*24*60*60*1000,
    mo: (365.25*24*60*60*1000)/12,
    w: 7*24*60*60*1000,
    d: 24*60*60*1000,
    h: 60*60*1000,
    m: 60*1000,
    s: 1000,
    ms: 1,
  };
  const defaultOpts: DurationFormatOption = {
    delimiter: '',
    unit: DurationUnit.ms,
    disableUnits: [],
    unitMeasures: defaultUnitMeasures,
    labelObj: defaultLabelObj,
  };
  const options: DurationFormatOption = Object.assign({}, defaultOpts, opts);
  options.labelObj = Object.assign({}, defaultLabelObj, options.labelObj);
  options.unitMeasures = Object.assign({}, defaultUnitMeasures, options.unitMeasures);
  const {
    unitMeasures,
  } = options as { unitMeasures: DurationUnitDict<number> };
  const durationInMs = unitMeasures[options.unit] * duration;
  let remainMs = durationInMs;
  const result: string[] = Object.keys(unitMeasures).reduce((acc, item) => {
    const {
      disableUnits = [],
      labelObj,
    } = options as { 
      disableUnits: DurationUnitKey[],
      labelObj: DurationUnitDict<string | UnitLabelFunc>
    };
    const num = Math.floor(remainMs / unitMeasures[item as DurationUnitKey]);
    if (disableUnits.indexOf(item as DurationUnitKey) === -1 &&
      num > 0) {
      acc.push(`${num}${getUnitLabel(num, labelObj[item as DurationUnitKey])}`);
      remainMs -= num * unitMeasures[item as DurationUnitKey];
    }
    return acc;
  }, [] as string[]);
  return result.join(options.delimiter);
}

export default durationFormat;
