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

const shouldRenderPixel = (spritePosition: number, rowPosition: number) => {
  return rowPosition >= spritePosition - 1 && rowPosition <= spritePosition + 1;
}

const result = Object.values(cycleMap).reduce<string[]>((crt, position, index) => {
  const output = shouldRenderPixel(position, index - (40 * (crt.length - 1))) ? '#' : '.';

  if (index % 40 === 0) {
    crt.push(output);
  } else {
    crt[crt.length - 1] = crt[crt.length - 1] + output;
  }

  return crt;
}, []);

console.log(result.join('\n'));
