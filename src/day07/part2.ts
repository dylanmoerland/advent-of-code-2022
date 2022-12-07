import { readText } from '../helpers/readText';

const data = readText('src/day07/data.txt');

const { system } = data
  .split('\n')
  .reduce<{ system: Record<string, number>, path: string[] }>(({ system, path }, line) => {
    const [, pathChange] = line.match(/cd (.*)/) || [];
    if (pathChange) {
      return {
        system: {
          ...system,
          ...(pathChange !== '..' ? {[[...path, pathChange].join(' ')]: 0} : {}),
        },
        path: pathChange === '..' ? path.slice(0, path.length - 1) : [...path, pathChange]
      }
    }

    const [, fileSize] = line.match(/(([0-9]){1,100}) (.*)/) || [];

    if (!fileSize) return { system, path };

    return {
      system: Object.entries(system).reduce<Record<string, number>>((newSystem, [key, value]) => {
        return {
          ...newSystem,
          [key]: key.split(' ').every((p) => path.includes(p)) ? value + parseInt(fileSize, 10) : value,
        }
      }, {}),
      path,
    };
  }, { path: [], system: {} });

const spaceNeeded = 30000000 - (70000000 - system['/']);

const result = Object.entries(system)
  .reduce((totalSize, [, value]) => {
    return value >= spaceNeeded && value < totalSize ? value : totalSize;
  }, system['/']);

console.log(result);