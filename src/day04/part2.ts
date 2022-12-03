import { readText } from '../helpers/readText';

const data = readText('src/day04/data.txt')

const result = data
  .split('\n')

console.log(result);