import { readText } from '../helpers/readText';

const data = readText('src/day06/data.txt')

const result = data
  .split('\n')
  .reduce((total, line) => {
    const chars = line.split('');
    const startOfPacket =  chars.slice(4).findIndex((_, index) => {
      const slice = chars.slice(index, index + 4);
      return slice.every((char, n) => !slice.slice(n + 1).includes(char));
    }) + 4;

    return total + startOfPacket;
  }, 0);

console.log(result);