import { readText } from '../helpers/readText';

const data = readText('src/day04/data.txt')

const result = data
  .split('\n')
  .map((line) => line.split(',').map((group) => 
    group.split('-').map((value) => parseInt(value, 10))
  ))
  .reduce((total, [[aStart, aEnd], [bStart, bEnd]]) => {
    if ((aStart >= bStart && aEnd <= bEnd ) || (bStart >= aStart && bEnd <= aEnd))
      return total + 1;
    return total;
  }, 0);
  
console.log(result);