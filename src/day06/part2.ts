import { readText } from '../helpers/readText';

const data = readText('src/day06/data.txt')

const result = data
  .split('\n')
  .reduce((total, line) => {
    const chars = line.split('');
    const startOfPacket = chars.slice(14).findIndex((_, index) => {
      const packet = chars.slice(index, index + 14);
      return packet.every((char, n) => !packet.slice(n + 1).includes(char));
    }) + 14;

    return total + startOfPacket;
  }, 0);

console.log(result);