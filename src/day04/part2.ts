import { readText } from '../helpers/readText';

const data = readText('src/day04/data.txt')

const result = data
  .split('\n')
  .map((line) => line.split(',').map((group) => 
    group.split('-').map((value) => parseInt(value, 10))
  ))
  .map(([a,b]) => [
    new Array(a[a.length - 1] - a[0] + 1).fill(0).map((_,index) => a[0] + index),
    new Array(b[b.length - 1] - b[0] + 1).fill(0).map((_,index) => b[0] + index)
  ])
  .reduce((total, [a, b]) => {
    return total + (a.some((value) => b.includes(value)) ? 1 : 0);
  }, 0);
  
console.log(result);