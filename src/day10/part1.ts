import { readText } from '../helpers/readText';

const data = readText('src/day10/data.txt');

const cycleMap: Record<number, number> = {}

data
  .split('\n')
  .reduce((cycles, line) => {
    if (line === 'noop') return [...cycles, { line, executeIn: 0 }];

    else return [...cycles, { line, executeIn: 1 },  { line, executeIn: 0 }]
  }, [])
  .reduce<number>((value, { line, executeIn }, cycle) => {
    const [, updateValue] = line.split(' ');

    cycleMap[cycle] = value;

    if (updateValue && executeIn === 0) {
      return value + parseInt(updateValue, 10);
    }

    return value;
  }, 1);

console.log(
  (cycleMap[20 - 1] * 20) + (cycleMap[60 - 1] * 60) + (cycleMap[100 - 1] * 100)
  + (cycleMap[140 - 1] * 140) + (cycleMap[180 - 1] * 180) + ((cycleMap[220 - 1]) * 220)
);  
