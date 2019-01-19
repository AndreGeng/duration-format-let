# duration-format-let
format duration to humanize format

```
import durationFormatLet from 'duration-format-let';

console.log(durationFormatLet(1000)); // 1s
console.log(durationFormatLet(90000)); // 1m30s
console.log(durationFormatLet(100000,{unit: 's', delimiter: ' '})) // 1d 3h 46m 40s
```
