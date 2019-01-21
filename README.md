# duration-format-let
format duration to humanize format

## Basic Usage

```
import dfl from 'duration-format-let';

dfl(1000); // 1s
dfl(90000); // 1m30s
dfl(100000,{unit: 's', delimiter: ' '}); // 1d 3h 46m 40s
```

## Options Usage

#### Options.delimiter
you can change the delimiter between different unit.
```
dfl(100000); // 1d3h46m40s
dfl(100000,{unit: 's', delimiter: ','}); // 1d,3h,46m,40s

```

#### Options.unit
you can change the input duration unit. default unit is millisecond.

```
dfl(1000); // 1s
dfl(1000, { unit: 'h' }); // 1mo1w4d5h30m
```

#### Options.disableUnits
you can disable some units in the output format.
```
dfl(9000 * 1000); // 2h30m
dfl(9000 * 1000, { disableUnits: ['m'] }); // 2h1800s
dfl(9000 * 1000, { disableUnits: ['m', 's', 'ms'] }); // 2h
```

#### Options.unitMeasures
by default 1 year = 365.25 days, 1 month = 1/12 year. you can change this behavior by passing Options.unitMeasures
```
dfl(1000*60*60*1000); // 1mo1w4d5h30m
dfl(1000*60*60*1000, {
  unitMeasures: {
    mo: 30*24*60*60*1000,
  },
});  // 1mo1w4d16h
```

#### Options.labelObj
you can change display unit label, by passing Options.labelObj
```
dfl(1000*60*60*1000); // 1mo1w4d5h30m
dfl(1000*60*60*1000, {
  labelObj: {
    mo: 'month',
    w: 'week',
    d: 'day',
    h: 'hour',
    m: 'minute'
  }
}); // 1month1week4day5hour30minute
dfl(1000*60*60*1000, {
  labelObj: {
    mo: num => `month${num > 1 ? 's' : ''}`,
    w: num => `week${num > 1 ? 's' : ''}`,
    d: num => `day${num > 1 ? 's' : ''}`,
    h: num => `hour${num > 1 ? 's' : ''}`,
    m: num => `minute${num > 1 ? 's' : ''}`
  }
}); // 1month1week4days5hours30minutes
```
